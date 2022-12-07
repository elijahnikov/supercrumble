// Server
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";

// Utils/Constants
import path from "path";
import { COOKIE_NAME, prod } from "./constants";
import "dotenv-safe/config";
import "reflect-metadata";

// Entities
import entities from "./utils/serverSetup/entitiesExport";

// Loaders
import { createFilmLoader } from "./utils/loaders/createFilmLoader";
import { createReviewCommentUpvoteLoader } from "./utils/loaders/createReviewCommentUpvoteLoader";
import { createUpvoteLoader } from "./utils/loaders/createUpvoteLoader";
import { createUserLoader } from "./utils/loaders/createUserLoader";

// Resolvers
import { ReviewResolver } from "./resolvers/review";
import { UserResolver } from "./resolvers/user";
import { ReviewCommentResolver } from "./resolvers/reviewComment";
import { FilmsResolver } from "./resolvers/film/films";
import { FilmTagsResolver } from "./resolvers/film/filmTags";
import { FilmListResolver } from "./resolvers/filmList/filmList";
import { FilmListEntriesResolver } from "./resolvers/filmList/filmListEntries";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: false,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities,
    });
    await conn.runMigrations();
    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ client: redis, disableTouch: true }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
                httpOnly: true,
                secure: prod,
                sameSite: "lax",
                domain: prod ? ".supercrumble.com" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                ReviewResolver,
                UserResolver,
                ReviewCommentResolver,
                FilmsResolver,
                FilmTagsResolver,
                FilmListResolver,
                FilmListEntriesResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader(),
            upvoteLoader: createUpvoteLoader(),
            reviewCommentUpvoteLoader: createReviewCommentUpvoteLoader(),
            filmLoader: createFilmLoader(),
        }),
        playground: true,
        introspection: true,
    });

    apolloServer.applyMiddleware({ app, cors: false });

    //run server
    app.listen(parseInt(process.env.PORT), () => {
        console.log("Server has started on localhost:4000");
    });
};

main().catch((err) => {
    console.error(err);
});
