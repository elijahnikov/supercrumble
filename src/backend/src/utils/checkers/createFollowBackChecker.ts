import { Subscription } from "../../entities/subscription/subscription";

export const createFollowBackChecker = async (
	userId: number,
	followerId: number
) => {
	const check = await Subscription.findOne({
		where: {
			userId,
			followerId,
		},
	});

	if (check) return true;
	return false;
};
