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
exports.Upvote = void 0;
const typeorm_1 = require("typeorm");
const review_1 = require("./review");
const user_1 = require("./user");
let Upvote = class Upvote extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Upvote.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Upvote.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.upvotes),
    __metadata("design:type", user_1.User)
], Upvote.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Upvote.prototype, "reviewId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => review_1.Review, (review) => review.upvotes, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", review_1.Review)
], Upvote.prototype, "review", void 0);
Upvote = __decorate([
    (0, typeorm_1.Entity)()
], Upvote);
exports.Upvote = Upvote;
//# sourceMappingURL=upvote.js.map