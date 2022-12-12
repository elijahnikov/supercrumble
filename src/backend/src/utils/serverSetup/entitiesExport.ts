import { FilmListTags } from "../../entities/filmList/filmListTags";
import { Films } from "../../entities/film/films";
import { FilmTags } from "../../entities/film/filmTags";
import { FilmList } from "../../entities/filmList/filmList";
import { FilmListEntries } from "../../entities/filmList/filmListEntries";
import { Review } from "../../entities/review/review";
import { ReviewComment } from "../../entities/review/reviewComment";
import { ReviewCommentUpvote } from "../../entities/review/reviewCommentUpvote";
import { Upvote } from "../../entities/review/upvote";
import { User } from "../../entities/user/user";
import { FilmListUpvote } from "../../entities/filmList/filmListUpvote";
import { FilmListComment } from "../../entities/filmList/filmListComment";

export default [
    //User
    User,

    //Review
    Review,
    Upvote,
    ReviewComment,
    ReviewCommentUpvote,

    //Films
    Films,
    FilmTags,

    //FilmList
    FilmList,
    FilmListEntries,
    FilmListTags,
    FilmListUpvote,
    FilmListComment,
];
