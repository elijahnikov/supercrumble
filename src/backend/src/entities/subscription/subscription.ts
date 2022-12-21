import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user";

@ObjectType()
@Entity()
export class Subscription extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    followerId: number;

    @Column({ type: "int", nullable: true })
    value: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    //USER RELATIONSHIP_________________________________________
    //__________________________________________________________
    @ManyToMany(() => User, (user) => user.subscription)
    follower: User[];
}
