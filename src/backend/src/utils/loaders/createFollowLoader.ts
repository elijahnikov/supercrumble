import DataLoader from "dataloader";
import { Subscription } from "../../entities/subscription/subscription";

export const createFollowLoader = () =>
    new DataLoader<{ followerId: number; userId: number }, Subscription | null>(
        async (keys) => {
            const follows = await Subscription.findByIds(keys as any);
            const followIdsToFollow: Record<string, Subscription> = {};
            follows.forEach((follow) => {
                followIdsToFollow[`${follow.userId}|${follow.followerId}`];
            });
            return keys.map(
                (key) => followIdsToFollow[`${key.userId}|${key.followerId}`]
            );
        }
    );
