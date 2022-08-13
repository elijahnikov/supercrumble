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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewComment = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const review_1 = require("./review");
const reviewCommentUpvote_1 = require("./reviewCommentUpvote");
const user_1 = require("./user");
let ReviewComment = class ReviewComment extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReviewComment.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReviewComment.prototype, "parentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReviewComment.prototype, "creatorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReviewComment.prototype, "reviewId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.reviewComments),
    __metadata("design:type", user_1.User)
], ReviewComment.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => review_1.Review, review => review.reviewComments),
    __metadata("design:type", review_1.Review)
], ReviewComment.prototype, "review", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReviewComment.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], ReviewComment.prototype, "score", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], ReviewComment.prototype, "voteStatus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewCommentUpvote_1.ReviewCommentUpvote, reviewCommentUpvote => reviewCommentUpvote.reviewComment),
    __metadata("design:type", Array)
], ReviewComment.prototype, "upvotes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ReviewComment.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ReviewComment.prototype, "updatedAt", void 0);
ReviewComment = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ReviewComment);
exports.ReviewComment = ReviewComment;
//# sourceMappingURL=reviewComment.js.map