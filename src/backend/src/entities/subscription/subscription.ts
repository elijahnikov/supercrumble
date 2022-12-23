import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryColumn,
} from "typeorm";
import { User } from "../user/user";

@ObjectType()
@Entity()
export class Subscription extends BaseEntity {
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field()
    @PrimaryColumn()
    followerId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    //USER RELATIONSHIP_________________________________________
    //__________________________________________________________
    @ManyToMany(() => User, (user) => user.subscription)
    follower: User[];
}
