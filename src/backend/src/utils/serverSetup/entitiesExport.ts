import { FilmListTags } from "../../entities/filmList/filmListTags";
import { Films } from "../../entities/film/films";
import { ReviewTags } from "../../entities/review/reviewTags";
import { FilmList } from "../../entities/filmList/filmList";
import { FilmListEntries } from "../../entities/filmList/filmListEntries";
import { Review } from "../../entities/review/review";
import { ReviewComment } from "../../entities/review/reviewComment";
import { ReviewCommentUpvote } from "../../entities/review/reviewCommentUpvote";
import { Upvote } from "../../entities/review/upvote";
import { User } from "../../entities/user/user";
import { FilmListUpvote } from "../../entities/filmList/filmListUpvote";
import { FilmListComment } from "../../entities/filmList/filmListComment";
import { Subscription } from "../../entities/subscription/subscription";

export default [
    //User
    User,

    //Review
    Review,
    Upvote,
    ReviewComment,
    ReviewCommentUpvote,
    ReviewTags,

    //Films
    Films,

    //FilmList
    FilmList,
    FilmListEntries,
    FilmListTags,
    FilmListUpvote,
    FilmListComment,

    //Subscription
    Subscription,
];
