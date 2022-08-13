import DataLoader from 'dataloader'
import { ReviewCommentUpvote } from '../entities/reviewCommentUpvote';

export const createReviewCommentUpvoteLoader = () => new DataLoader<{reviewCommentId: number, userId: number}, ReviewCommentUpvote | null>(async (keys) => {
    const upvotes = await ReviewCommentUpvote.findByIds(keys as any)
    const upvoteIdsToUpvote: Record<string, ReviewCommentUpvote> = {};
    upvotes.forEach((upvote) => {
        upvoteIdsToUpvote[`${upvote.userId}|${upvote.reviewCommentId}`] = upvote;
    })
    return keys.map((key) => upvoteIdsToUpvote[`${key.userId}|${key.reviewCommentId}`])
})