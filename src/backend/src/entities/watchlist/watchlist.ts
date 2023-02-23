import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user";

@ObjectType()
@Entity()
export class Watchlist extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	filmId: number;

	@Field()
	@Column()
	creatorId: number;

	@Field()
	@Column()
	filmTitle: string;

	@Field()
	@Column()
	posterPath: string;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.watchlist)
	creator: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
