import DataLoader from 'dataloader'
import { Upvote } from '../entities/upvote';

export const createUpvoteLoader = () => new DataLoader<{reviewId: number; userId: number}, Upvote | null>(async (keys) => {
    const upvotes = await Upvote.findByIds(keys as any)
    const upvoteIdsToUpvote: Record<string, Upvote> = {};
    upvotes.forEach((upvote) => {
        upvoteIdsToUpvote[`${upvote.userId}|${upvote.reviewId}`] = upvote;
    })
    return keys.map((key) => upvoteIdsToUpvote[`${key.userId}|${key.reviewId}`])
});