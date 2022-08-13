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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewCommentUpvote = void 0;
const typeorm_1 = require("typeorm");
const reviewComment_1 = require("./reviewComment");
const user_1 = require("./user");
let ReviewCommentUpvote = class ReviewCommentUpvote extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ReviewCommentUpvote.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ReviewCommentUpvote.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ReviewCommentUpvote.prototype, "reviewCommentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.reviewCommentUpvotes),
    __metadata("design:type", user_1.User)
], ReviewCommentUpvote.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reviewComment_1.ReviewComment, (reviewComment) => reviewComment.upvotes, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", reviewComment_1.ReviewComment)
], ReviewCommentUpvote.prototype, "reviewComment", void 0);
ReviewCommentUpvote = __decorate([
    (0, typeorm_1.Entity)()
], ReviewCommentUpvote);
exports.ReviewCommentUpvote = ReviewCommentUpvote;
//# sourceMappingURL=reviewCommentUpvote.js.map