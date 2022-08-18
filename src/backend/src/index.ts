import express from "express";
import "dotenv-safe/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ReviewResolver } from "./resolvers/review";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, prod } from "./constants";
import cors from "cors";
import { createConnection } from "typeorm";
import { Review } from "./entities/review";
import { User } from "./entities/user";
import path from "path";
import { Upvote } from "./entities/upvote";
import { createUserLoader } from "./utils/createUserLoader";
import { createUpvoteLoader } from "./utils/createUpvoteLoader";
import { ReviewComment } from "./entities/reviewComment";
import { ReviewCommentResolver } from "./resolvers/reviewComment";
import { ReviewCommentUpvote } from "./entities/reviewCommentUpvote";
import { createReviewCommentUpvoteLoader } from "./utils/createReviewCommentUpvoteLoader";
import { FilmsResolver } from "./resolvers/films";
import { Films } from "./entities/films";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: false,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [
            Review,
            User,
            Upvote,
            ReviewComment,
            ReviewCommentUpvote,
            Films,
        ],
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
