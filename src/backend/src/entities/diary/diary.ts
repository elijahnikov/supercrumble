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
export class Diary extends BaseEntity {
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

	@Field()
	@Column({ type: "float", default: 0 })
	ratingGiven: number;

	@Field()
	@Column()
	rewatch: boolean;

	@Field(() => String)
	@Column()
	watchedOn: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	reviewLink: string;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.watched)
	creator: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
