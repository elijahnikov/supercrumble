import { Subscription } from "../../entities/subscription/subscription";
import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/user/user";
import { MyContext } from "../../types";
import { isAuth } from "../../middleware/isAuth";
import { getConnection } from "typeorm";

@Resolver(Subscription)
export class SubscriptionResolver {}
