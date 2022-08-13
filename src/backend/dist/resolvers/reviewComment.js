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
exports.ReviewCommentResolver = void 0;
const reviewComment_1 = require("../entities/reviewComment");
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entities/user");
const isAuth_1 = require("../middleware/isAuth");
const ReviewCommentInput_1 = require("./inputs/ReviewCommentInput");
const typeorm_1 = require("typeorm");
const review_1 = require("../entities/review");
const reviewCommentUpvote_1 = require("../entities/reviewCommentUpvote");
let PaginatedReviewComments = class PaginatedReviewComments {
};
__decorate([
    (0, type_graphql_1.Field)(() => [reviewComment_1.ReviewComment]),
    __metadata("design:type", Array)
], PaginatedReviewComments.prototype, "reviewComments", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginatedReviewComments.prototype, "hasMore", void 0);
PaginatedReviewComments = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedReviewComments);
let ReviewCommentResolver = class ReviewCommentResolver {
    creator(reviewComment, { userLoader }) {
        return userLoader.load(reviewComment.creatorId);
    }
    voteStatus(reviewComment, { reviewCommentUpvoteLoader, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const reviewCommentUpvote = yield reviewCommentUpvoteLoader.load({ reviewCommentId: reviewComment.id, userId: req.session.userId });
            return reviewCommentUpvote ? reviewCommentUpvote.value : null;
        });
    }
    createReviewComment(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            yield (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(review_1.Review)
                .set({
                noOfComments: () => '"noOfComments" + 1'
            })
                .where("id = :id", { id: input.reviewId })
                .execute();
            return reviewComment_1.ReviewComment.create({
                text: input.text,
                reviewId: input.reviewId,
                parentId: input.parentId,
                creatorId: req.session.userId
            }).save();
        });
    }
    reviewComments(limit, cursor, reviewId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxLimit = Math.min(50, limit);
            const maxLimitPlusOne = maxLimit + 1;
            const replacements = [maxLimitPlusOne];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const qb = (0, typeorm_1.getConnection)()
                .getRepository(reviewComment_1.ReviewComment)
                .createQueryBuilder('cmt')
                .orderBy('cmt."createdAt"', order)
                .take(maxLimitPlusOne)
                .where('cmt."reviewId" = :review', { review: reviewId });
            if (cursor) {
                qb.andWhere('cmt. "createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
            }
            const reviewComments = yield qb.getMany();
            return {
                reviewComments: reviewComments.slice(0, maxLimit),
                hasMore: reviewComments.length === maxLimitPlusOne
            };
        });
    }
    deleteReviewComment(id, reviewId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield review_1.Review.findOne({ where: { id: reviewId } });
            const reviewComment = yield reviewComment_1.ReviewComment.findOne({ where: { id: id } });
            if (!review || !reviewComment) {
                return false;
            }
            yield reviewComment_1.ReviewComment.delete({ id, creatorId: req.session.userId });
            yield (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(review_1.Review)
                .set({
                noOfComments: () => '"noOfComments" - 1'
            })
                .where("id = :id", { id: reviewId })
                .execute();
            return true;
        });
    }
    updateReviewComment(id, text, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const result = yield (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(reviewComment_1.ReviewComment)
                .set({ text })
                .where('id = :id and "creatorId" = :creatorId', { id, creatorId: req.session.userId })
                .returning('*')
                .execute();
            return result.raw[0];
        });
    }
    reviewCommentVote(reviewCommentId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const reviewCommentUpvote = yield reviewCommentUpvote_1.ReviewCommentUpvote.findOne({ where: { reviewCommentId, userId } });
            if (reviewCommentUpvote) {
                yield (0, typeorm_1.getConnection)().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
                    delete from review_comment_upvote
                    where "reviewCommentId" = $1 and "userId" = $2
                    `, [reviewCommentId, userId]);
                    yield tm.query(`
                    update review_comment
                    set score = score - 1
                    where id = $1;
                    `, [reviewCommentId]);
                }));
            }
            else if (!reviewCommentUpvote) {
                yield (0, typeorm_1.getConnection)().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
                    insert into review_comment_upvote ("userId", "reviewCommentId", value)
                    values ($1, $2, $3);
                    `, [userId, reviewCommentId, value]);
                    yield tm.query(`
                    update review_comment
                    set score = score + 1
                    where id = $1;
                    `, [reviewCommentId]);
                }));
            }
            return true;
        });
    }
    reviewComment(id) {
        return reviewComment_1.ReviewComment.findOne({ where: { id } });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviewComment_1.ReviewComment, Object]),
    __metadata("design:returntype", void 0)
], ReviewCommentResolver.prototype, "creator", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => type_graphql_1.Int, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviewComment_1.ReviewComment, Object]),
    __metadata("design:returntype", Promise)
], ReviewCommentResolver.prototype, "voteStatus", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reviewComment_1.ReviewComment),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReviewCommentInput_1.ReviewCommentInput, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ReviewCommentResolver.prototype, "createReviewComment", null);
__decorate([
    (0, type_graphql_1.Query)(() => PaginatedReviewComments),
    __param(0, (0, type_graphql_1.Arg)('limit', () => type_graphql_1.Int, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('cursor', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('reviewId', () => type_graphql_1.Int)),
    __param(3, (0, type_graphql_1.Arg)('order', () => String, { nullable: true, defaultValue: 'DESC' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ReviewCommentResolver.prototype, "reviewComments", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('reviewId', () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReviewCommentResolver.prototype, "deleteReviewComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reviewComment_1.ReviewComment, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('text')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ReviewCommentResolver.prototype, "updateReviewComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('reviewCommentId', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('value', () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ReviewCommentResolver.prototype, "reviewCommentVote", null);
__decorate([
    (0, type_graphql_1.Query)(() => reviewComment_1.ReviewComment, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ReviewCommentResolver.prototype, "reviewComment", null);
ReviewCommentResolver = __decorate([
    (0, type_graphql_1.Resolver)(reviewComment_1.ReviewComment)
], ReviewCommentResolver);
exports.ReviewCommentResolver = ReviewCommentResolver;
//# sourceMappingURL=reviewComment.js.map