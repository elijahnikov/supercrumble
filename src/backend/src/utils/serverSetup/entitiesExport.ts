//User
import { User } from "../../entities/user/user";

//Review
import { Review } from "../../entities/review/review";
import { ReviewComment } from "../../entities/review/reviewComment";
import { ReviewCommentUpvote } from "../../entities/review/reviewCommentUpvote";
import { Upvote } from "../../entities/review/upvote";
import { ReviewTags } from "../../entities/review/reviewTags";

//Films
import { Films } from "../../entities/film/films";

//FilmList
import { FilmListTags } from "../../entities/filmList/filmListTags";
import { FilmList } from "../../entities/filmList/filmList";
import { FilmListEntries } from "../../entities/filmList/filmListEntries";
import { FilmListUpvote } from "../../entities/filmList/filmListUpvote";
import { FilmListComment } from "../../entities/filmList/filmListComment";

//Subscription
import { Subscription } from "../../entities/subscription/subscription";

//Watched
import { Watched } from "../../entities/watched/watched";

//Diary
import { Diary } from "../../entities/diary/diary";

// Watchlist
import { Watchlist } from "../../entities/watchlist/watchlist";

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

	//Watched
	Watched,

	//Diary
	Diary,

	//Watchlist
	Watchlist,
];
