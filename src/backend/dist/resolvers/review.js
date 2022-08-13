"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResolver = void 0;
const review_1 = require("../entities/review");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const typeorm_1 = require("typeorm");
const upvote_1 = require("../entities/upvote");
const user_1 = require("../entities/user");
const ReviewInput_1 = require("./inputs/ReviewInput");
let PaginatedReviews = class PaginatedReviews {
};
__decorate([
    (0, type_graphql_1.Field)(() => [review_1.Review]),
    __metadata("design:type", Array)
], PaginatedReviews.prototype, "reviews", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginatedReviews.prototype, "hasMore", void 0);
PaginatedReviews = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedReviews);
let ReviewResolver = class ReviewResolver {
    creator(review, { userLoader }) {
        return userLoader.load(review.creatorId);
    }
    voteStatus(review, { upvoteLoader, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const upvote = yield upvoteLoader.load({ reviewId: review.id, userId: req.session.userId });
            return upvote ? upvote.value : null;
        });
    }
    vote(reviewId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const upvote = yield upvote_1.Upvote.findOne({ where: { reviewId, userId } });
            if (upvote) {
                yield (0, typeorm_1.getConnection)().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
                    delete from upvote 
                    where "reviewId" = $1 and "userId" = $2
                `, [reviewId, userId]);
                    yield tm.query(`
                    update review
                    set score = score - 1
                    where id = $1;
                `, [reviewId]);
                }));
            }
            else if (!upvote) {
                yield (0, typeorm_1.getConnection)().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
                    insert into upvote ("userId", "reviewId", value)
                    values ($1, $2, $3);
                `, [userId, reviewId, value]);
                    yield tm.query(`
                    update review
                    set score = score + 1
                    where id = $1;
                `, [reviewId]);
                }));
            }
            return true;
        });
    }
    reviews(limit, cursor, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxLimit = Math.min(50, limit);
            const maxLimitPlusOne = maxLimit + 1;
            const replacements = [maxLimitPlusOne];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const qb = (0, typeorm_1.getConnection)()
                .getRepository(review_1.Review)
                .createQueryBuilder('rv')
                .orderBy('rv."createdAt"', 'DESC')
                .take(maxLimitPlusOne);
            if (cursor) {
                qb.where('rv. "createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
            }
            if (text) {
                qb.andWhere('rv."text" = :text', { text: text });
            }
            const reviews = yield qb.getMany();
            return { reviews: reviews.slice(0, maxLimit), hasMore: reviews.length === maxLimitPlusOne };
        });
    }
    review(id) {
        return review_1.Review.findOne({ where: { referenceId: id } });
    }
    createReview(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            return review_1.Review.create({
                movieId: input.movieId,
                creatorId: req.session.userId,
                containsSpoilers: input.containsSpoilers,
                text: input.text,
                movie_poster: input.movie_poster,
                movie_title: input.movie_title,
                movie_release_year: input.movie_release_year,
                ratingGiven: input.ratingGiven
            }).save();
        });
    }
    updateReview(referenceId, text, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(review_1.Review)
                .set({ text })
                .where('referenceId = :referenceId and "creatorId" = :creatorId', { referenceId, creatorId: req.session.userId })
                .returning('*')
                .execute();
            return result.raw[0];
        });
    }
    deleteReview(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield review_1.Review.delete({ id, creatorId: req.session.userId });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_1.Review, Object]),
    __metadata("design:returntype", void 0)
], ReviewResolver.prototype, "creator", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => type_graphql_1.Int, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_1.Review, Object]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "voteStatus", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('reviewId', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('value', () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "vote", null);
__decorate([
    (0, type_graphql_1.Query)(() => PaginatedReviews),
    __param(0, (0, type_graphql_1.Arg)('limit', () => type_graphql_1.Int, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('cursor', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("text", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ReviewResolver.prototype, "reviews", null);
__decorate([
    (0, type_graphql_1.Query)(() => review_1.Review, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ReviewResolver.prototype, "review", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => review_1.Review),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReviewInput_1.ReviewInput, Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReviewResolver.prototype, "createReview", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => review_1.Review, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('referenceId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('text')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ReviewResolver.prototype, "updateReview", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ReviewResolver.prototype, "deleteReview", null);
ReviewResolver = __decorate([
    (0, type_graphql_1.Resolver)(review_1.Review)
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=review.js.map