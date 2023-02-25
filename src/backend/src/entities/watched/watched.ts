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
export class Watched extends BaseEntity {
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

	@Field({ nullable: true })
	@Column({ type: "float", nullable: true })
	ratingGiven: number;

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
