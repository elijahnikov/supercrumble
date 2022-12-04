import { FilmListTags } from "../../entities/filmList/filmListTags";
import { Films } from "../../entities/film/films";
import { FilmTags } from "../../entities/film/filmTags";
import { FilmList } from "../../entities/filmList/filmList";
import { FilmListEntries } from "../../entities/filmList/filmListEntries";
import { Review } from "../../entities/review";
import { ReviewComment } from "../../entities/reviewComment";
import { ReviewCommentUpvote } from "../../entities/reviewCommentUpvote";
import { Upvote } from "../../entities/upvote";
import { User } from "../../entities/user";

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
];
