// Server
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection, getConnection } from "typeorm";

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
import { ReviewResolver } from "./resolvers/review/review";
import { UserResolver } from "./resolvers/user";
import { ReviewCommentResolver } from "./resolvers/review/reviewComment";
import { FilmsResolver } from "./resolvers/film/films";
import { ReviewTagsResolver } from "./resolvers/review/reviewTags";
import { FilmListResolver } from "./resolvers/filmList/filmList";
import { FilmListEntriesResolver } from "./resolvers/filmList/filmListEntries";
import { createFilmListUpvoteLoader } from "./utils/loaders/createFilmListUpvoteLoader";
import { FilmListCommentResolver } from "./resolvers/filmList/filmListComment";
import { FilmListTagsResolver } from "./resolvers/filmList/filmListTags";
import { SubscriptionResolver } from "./resolvers/subscription/subscription";
import { WatchedResolver } from "./resolvers/watched/watched";
import { DiaryResolver } from "./resolvers/diary/diary";

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
                //Review
                ReviewResolver,
                ReviewCommentResolver,
                ReviewTagsResolver,
                //User
                UserResolver,
                //Films
                FilmsResolver,
                //FilmList
                FilmListResolver,
                FilmListEntriesResolver,
                FilmListCommentResolver,
                FilmListTagsResolver,
                //Subscription
                SubscriptionResolver,
                //Watched
                WatchedResolver,
                //Diary
                DiaryResolver,
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
            filmListUpvoteLoader: createFilmListUpvoteLoader(),
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

const loadFilms = async () => {
    let connection = getConnection();

    for (let i = 967257; i <= 1066747; i++) {
        console.log("⬇️  ----> Fetching film " + i + "/1,066,747");
        await fetch(
            `https://api.themoviedb.org/3/movie/${i}?api_key=062b67bca7a1dbc477fd28d5b6a7eb99&language=en-US`
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log("❌ ----> errored out on " + i);
                }
            })
            .then(async (res) => {
                if (res) {
                    await connection.query(
                        `
                            INSERT INTO films ("movieId", "movieTitle", "overview", "posterPath", "backdropPath", "releaseDate")
                            VALUES ($1, $2, $3, $4, $5, $6);
                            `,
                        [
                            res.id,
                            res.original_title,
                            res.overview,
                            res.poster_path,
                            res.backdrop_path,
                            res.release_date,
                        ]
                    );

                    console.log(
                        "✅ ----> inserting film " +
                            res.original_title +
                            "--------------"
                    );
                    console.log(
                        "---------------⏳" +
                            ((i / 1066747) * 100).toFixed(2) +
                            "%"
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// loadFilms();
