"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv-safe/config");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const review_1 = require("./resolvers/review");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const review_2 = require("./entities/review");
const user_2 = require("./entities/user");
const path_1 = __importDefault(require("path"));
const upvote_1 = require("./entities/upvote");
const createUserLoader_1 = require("./utils/createUserLoader");
const createUpvoteLoader_1 = require("./utils/createUpvoteLoader");
const reviewComment_1 = require("./entities/reviewComment");
const reviewComment_2 = require("./resolvers/reviewComment");
const reviewCommentUpvote_1 = require("./entities/reviewCommentUpvote");
const createReviewCommentUpvoteLoader_1 = require("./utils/createReviewCommentUpvoteLoader");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, typeorm_1.createConnection)({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: false,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [review_2.Review, user_2.User, upvote_1.Upvote, reviewComment_1.ReviewComment, reviewCommentUpvote_1.ReviewCommentUpvote]
    });
    yield conn.runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: constants_1.prod,
            sameSite: 'lax',
            domain: constants_1.prod ? '.supercrumble.com' : undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [review_1.ReviewResolver, user_1.UserResolver, reviewComment_2.ReviewCommentResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redis,
            userLoader: (0, createUserLoader_1.createUserLoader)(),
            upvoteLoader: (0, createUpvoteLoader_1.createUpvoteLoader)(),
            reviewCommentUpvoteLoader: (0, createReviewCommentUpvoteLoader_1.createReviewCommentUpvoteLoader)()
        }),
        playground: true,
        introspection: true
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(parseInt(process.env.PORT), () => {
        console.log('Server has started on localhost:4000');
    });
});
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map