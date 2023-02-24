import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AddToWatchlistInput {
	@Field(() => Int)
	filmId: number;

	@Field(() => String)
	filmTitle: string;

	@Field(() => String)
	posterPath: string;
}
