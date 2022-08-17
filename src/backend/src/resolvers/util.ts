import { Review } from "src/entities/review";
import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class FieldError {
    @Field()
    message: string;
}

@ObjectType()
class SearchResponse { 
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
    
    @Field(() => [Review], {nullable: true})
    review?: Review[];
}

@Resolver()
export class UtilResolver {
    
    @Query()
    async search(
        @Arg("text", () => String) text: string,
    ): Promise<SearchResponse | null> {

        
        return {}
    }

}
