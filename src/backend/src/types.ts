import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { createFilmListUpvoteLoader } from "./utils/loaders/createFilmListUpvoteLoader";
import { createFilmLoader } from "./utils/loaders/createFilmLoader";
import { createFollowLoader } from "./utils/loaders/createFollowLoader";
import { createReviewCommentUpvoteLoader } from "./utils/loaders/createReviewCommentUpvoteLoader";
import { createUpvoteLoader } from "./utils/loaders/createUpvoteLoader";
import { createUserLoader } from "./utils/loaders/createUserLoader";

export type MyContext = {
    req: Request & {
        session: Session & Partial<SessionData> & { userId?: number };
    };
    res: Response;
    redis: Redis;
    userLoader: ReturnType<typeof createUserLoader>;
    upvoteLoader: ReturnType<typeof createUpvoteLoader>;
    reviewCommentUpvoteLoader: ReturnType<
        typeof createReviewCommentUpvoteLoader
    >;
    filmLoader: ReturnType<typeof createFilmLoader>;
    filmListUpvoteLoader: ReturnType<typeof createFilmListUpvoteLoader>;
    followLoader: ReturnType<typeof createFollowLoader>;
};
