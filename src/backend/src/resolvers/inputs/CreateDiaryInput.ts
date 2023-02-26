import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateDiaryInput {
	@Field(() => Int)
	filmId: number;

	@Field(() => String)
	filmTitle: string;

	@Field(() => String)
	posterPath: string;

	@Field()
	ratingGiven: number;

	@Field()
	rewatch: boolean;

	@Field({ nullable: true })
	reviewLink: string;

	@Field(() => String)
	watchedOn: string;
}
