import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddToWatchlistInput = {
  filmId: Scalars['Int'];
  filmTitle: Scalars['String'];
  posterPath: Scalars['String'];
};

export type BatchedListResponse = {
  __typename?: 'BatchedListResponse';
  filmList?: Maybe<FilmList>;
  filmListEntries: Array<FilmListEntries>;
  hasMore: Scalars['Boolean'];
};

export type CreateDiaryInput = {
  filmId: Scalars['Int'];
  filmTitle: Scalars['String'];
  posterPath: Scalars['String'];
  ratingGiven: Scalars['Float'];
  reviewLink?: InputMaybe<Scalars['String']>;
  rewatch: Scalars['Boolean'];
  watchedOn: Scalars['String'];
};

export type CreateWatchedInput = {
  filmId: Scalars['Int'];
  filmTitle: Scalars['String'];
  posterPath: Scalars['String'];
  ratingGiven?: InputMaybe<Scalars['Float']>;
};

export type Diary = {
  __typename?: 'Diary';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  filmId: Scalars['Float'];
  filmTitle: Scalars['String'];
  id: Scalars['Float'];
  posterPath: Scalars['String'];
  ratingGiven: Scalars['Float'];
  reviewLink?: Maybe<Scalars['String']>;
  rewatch: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  watchedOn: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FilmInput = {
  backdropPath?: InputMaybe<Scalars['String']>;
  movieId: Scalars['Float'];
  movieTitle: Scalars['String'];
  overview?: InputMaybe<Scalars['String']>;
  posterPath?: InputMaybe<Scalars['String']>;
  releaseDate: Scalars['String'];
};

export type FilmList = {
  __typename?: 'FilmList';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  filmFivePosterPath?: Maybe<Scalars['String']>;
  filmFourPosterPath?: Maybe<Scalars['String']>;
  filmOnePosterPath?: Maybe<Scalars['String']>;
  filmThreePosterPath?: Maybe<Scalars['String']>;
  filmTwoPosterPath?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  noOfComments: Scalars['Float'];
  numberOfFilms: Scalars['Float'];
  score: Scalars['Float'];
  tags: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type FilmListComment = {
  __typename?: 'FilmListComment';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  filmListId: Scalars['String'];
  id: Scalars['Float'];
  score: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type FilmListCommentInput = {
  filmListId: Scalars['String'];
  text: Scalars['String'];
};

export type FilmListEntries = {
  __typename?: 'FilmListEntries';
  createdAt: Scalars['String'];
  film: Films;
  filmId: Scalars['Float'];
  id: Scalars['Float'];
  listId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FilmListEntriesInput = {
  filmId: Scalars['Float'];
  listId: Scalars['String'];
};

export type FilmListInput = {
  description: Scalars['String'];
  filmFivePosterPath?: InputMaybe<Scalars['String']>;
  filmFourPosterPath?: InputMaybe<Scalars['String']>;
  filmOnePosterPath?: InputMaybe<Scalars['String']>;
  filmThreePosterPath?: InputMaybe<Scalars['String']>;
  filmTwoPosterPath?: InputMaybe<Scalars['String']>;
  tags: Scalars['String'];
  title: Scalars['String'];
};

export type FilmListResponse = {
  __typename?: 'FilmListResponse';
  filmList?: Maybe<FilmList>;
};

export type FilmListTags = {
  __typename?: 'FilmListTags';
  count?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Films = {
  __typename?: 'Films';
  backdropPath?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  likeCount: Scalars['Float'];
  listCount: Scalars['Float'];
  movieId: Scalars['Float'];
  movieTitle: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  posterPath?: Maybe<Scalars['String']>;
  releaseDate: Scalars['String'];
  updatedAt: Scalars['String'];
  watchCount: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEntryToFilmList?: Maybe<Scalars['Boolean']>;
  addToWatchlist?: Maybe<Watchlist>;
  changeUsername?: Maybe<UserResponse>;
  createDiary: Diary;
  createEntries?: Maybe<Scalars['Boolean']>;
  createFilm?: Maybe<Scalars['Boolean']>;
  createFilmList: FilmListResponse;
  createFilmListComment: FilmListComment;
  createReview: Review;
  createReviewComment: ReviewComment;
  createWatched?: Maybe<Watched>;
  deleteFilmListEntry: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  deleteReviewComment: Scalars['Boolean'];
  editUserDetails: UserResponse;
  filmListVote: Scalars['Boolean'];
  follow: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  reviewCommentVote: Scalars['Boolean'];
  settingsChangeEmail: UserResponse;
  settingsChangePassword: UserResponse;
  signS3: S3Payload;
  updateFilmList?: Maybe<Scalars['Boolean']>;
  updateReview?: Maybe<Review>;
  updateReviewComment?: Maybe<ReviewComment>;
  vote: Scalars['Boolean'];
};


export type MutationAddEntryToFilmListArgs = {
  filmId: Scalars['Int'];
  listId: Scalars['String'];
};


export type MutationAddToWatchlistArgs = {
  input: AddToWatchlistInput;
};


export type MutationChangeUsernameArgs = {
  input: NewUsernameInput;
};


export type MutationCreateDiaryArgs = {
  input: CreateDiaryInput;
};


export type MutationCreateEntriesArgs = {
  input: Array<FilmListEntriesInput>;
};


export type MutationCreateFilmArgs = {
  input: Array<FilmInput>;
};


export type MutationCreateFilmListArgs = {
  filmIds: Array<Scalars['Int']>;
  input: FilmListInput;
};


export type MutationCreateFilmListCommentArgs = {
  input: FilmListCommentInput;
};


export type MutationCreateReviewArgs = {
  input: ReviewInput;
};


export type MutationCreateReviewCommentArgs = {
  input: ReviewCommentInput;
};


export type MutationCreateWatchedArgs = {
  input: CreateWatchedInput;
};


export type MutationDeleteFilmListEntryArgs = {
  filmListId: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReviewCommentArgs = {
  id: Scalars['Int'];
  reviewId: Scalars['Int'];
};


export type MutationEditUserDetailsArgs = {
  input: UserDetailsInput;
};


export type MutationFilmListVoteArgs = {
  filmListId: Scalars['String'];
  value: Scalars['Int'];
};


export type MutationFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};


export type MutationReviewCommentVoteArgs = {
  reviewCommentId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationSettingsChangeEmailArgs = {
  currentEmail: Scalars['String'];
  newEmail: Scalars['String'];
};


export type MutationSettingsChangePasswordArgs = {
  currentPassword: Scalars['String'];
  settingsNewPassword: Scalars['String'];
};


export type MutationSignS3Args = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
};


export type MutationUpdateFilmListArgs = {
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateReviewArgs = {
  referenceId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateReviewCommentArgs = {
  id: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationVoteArgs = {
  reviewId: Scalars['Int'];
  value: Scalars['Int'];
};

export type NewUsernameInput = {
  newUsername: Scalars['String'];
};

export type PaginatedDiary = {
  __typename?: 'PaginatedDiary';
  diary: Array<Diary>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFilmListComments = {
  __typename?: 'PaginatedFilmListComments';
  filmListComments: Array<FilmListComment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFilmListEntries = {
  __typename?: 'PaginatedFilmListEntries';
  filmListEntries: Array<FilmListEntries>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFilmListTags = {
  __typename?: 'PaginatedFilmListTags';
  filmListTags: Array<FilmListTags>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFilmLists = {
  __typename?: 'PaginatedFilmLists';
  filmLists: Array<FilmList>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFollowers = {
  __typename?: 'PaginatedFollowers';
  hasMore: Scalars['Boolean'];
  subscription: Array<Subscription>;
};

export type PaginatedFollowing = {
  __typename?: 'PaginatedFollowing';
  hasMore: Scalars['Boolean'];
  subscription: Array<Subscription>;
};

export type PaginatedReviewComments = {
  __typename?: 'PaginatedReviewComments';
  hasMore: Scalars['Boolean'];
  reviewComments: Array<ReviewComment>;
};

export type PaginatedReviews = {
  __typename?: 'PaginatedReviews';
  hasMore: Scalars['Boolean'];
  reviews: Array<Review>;
};

export type PaginatedWatched = {
  __typename?: 'PaginatedWatched';
  hasMore: Scalars['Boolean'];
  watched: Array<Watched>;
};

export type PaginatedWatchlist = {
  __typename?: 'PaginatedWatchlist';
  hasMore: Scalars['Boolean'];
  watchlist: Array<Watchlist>;
};

export type Query = {
  __typename?: 'Query';
  checkIfFollowingUser: Scalars['Boolean'];
  checkIfUsernameTaken?: Maybe<Scalars['Boolean']>;
  diary: PaginatedDiary;
  film?: Maybe<Films>;
  filmList?: Maybe<BatchedListResponse>;
  filmListComments: PaginatedFilmListComments;
  filmListEntries: PaginatedFilmListEntries;
  filmListTags: PaginatedFilmListTags;
  filmLists: PaginatedFilmLists;
  followers: PaginatedFollowers;
  followings: PaginatedFollowing;
  getUser?: Maybe<User>;
  getUserByUsername?: Maybe<User>;
  me?: Maybe<User>;
  numberOfWatchedByYear: Scalars['Int'];
  review?: Maybe<Review>;
  reviewComment?: Maybe<ReviewComment>;
  reviewComments: PaginatedReviewComments;
  reviews: PaginatedReviews;
  tags?: Maybe<ReviewTags>;
  watched: PaginatedWatched;
  watchlist: PaginatedWatchlist;
};


export type QueryCheckIfFollowingUserArgs = {
  userId: Scalars['Int'];
};


export type QueryCheckIfUsernameTakenArgs = {
  username: Scalars['String'];
};


export type QueryDiaryArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryFilmArgs = {
  movieId: Scalars['Int'];
};


export type QueryFilmListArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFilmListCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filmListId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};


export type QueryFilmListEntriesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  listId: Scalars['Int'];
};


export type QueryFilmListTagsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFilmListsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  dateLimit?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryFollowersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
};


export type QueryFollowingsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryNumberOfWatchedByYearArgs = {
  year?: InputMaybe<Scalars['String']>;
};


export type QueryReviewArgs = {
  id: Scalars['String'];
};


export type QueryReviewCommentArgs = {
  id: Scalars['Int'];
};


export type QueryReviewCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  reviewId: Scalars['Int'];
};


export type QueryReviewsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  movieId?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryTagsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryWatchedArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type QueryWatchlistArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  backdrop: Scalars['String'];
  containsSpoilers: Scalars['Boolean'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  movieId: Scalars['Float'];
  movie_poster: Scalars['String'];
  movie_release_year: Scalars['Float'];
  movie_title: Scalars['String'];
  noOfComments: Scalars['Float'];
  ratingGiven: Scalars['Float'];
  referenceId: Scalars['String'];
  score: Scalars['Float'];
  tags: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
  watchedOn?: Maybe<Scalars['String']>;
};

export type ReviewComment = {
  __typename?: 'ReviewComment';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  parentId?: Maybe<Scalars['Float']>;
  reviewId: Scalars['Float'];
  score: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type ReviewCommentInput = {
  parentId?: InputMaybe<Scalars['Float']>;
  reviewId: Scalars['Float'];
  text: Scalars['String'];
};

export type ReviewInput = {
  backdrop: Scalars['String'];
  containsSpoilers: Scalars['Boolean'];
  movieId: Scalars['Float'];
  movie_poster: Scalars['String'];
  movie_release_year: Scalars['Float'];
  movie_title: Scalars['String'];
  ratingGiven: Scalars['Float'];
  tags: Scalars['String'];
  text: Scalars['String'];
  watchedOn?: InputMaybe<Scalars['String']>;
};

export type ReviewTags = {
  __typename?: 'ReviewTags';
  count?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type S3Payload = {
  __typename?: 'S3Payload';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createdAt: Scalars['String'];
  follower: User;
  followerId: Scalars['Float'];
  following: User;
  userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  bioLink?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  followers: Scalars['Float'];
  following: Scalars['Float'];
  header?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  onboarded?: Maybe<Scalars['Boolean']>;
  totalFilmsWatched: Scalars['Float'];
  totalHoursWatched: Scalars['Float'];
  totalListsCreated: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  usernameChangeDate?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

export type UserDetailsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  bioLink?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Scalars['String']>;
  onboarded?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Watched = {
  __typename?: 'Watched';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  filmId: Scalars['Float'];
  filmTitle: Scalars['String'];
  id: Scalars['Float'];
  posterPath: Scalars['String'];
  ratingGiven?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
};

export type Watchlist = {
  __typename?: 'Watchlist';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  filmId: Scalars['Float'];
  filmTitle: Scalars['String'];
  id: Scalars['Float'];
  posterPath: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type FilmListSnippetFragment = { __typename?: 'FilmList', id: string, title: string, description?: string | null, tags: string, creatorId: number, createdAt: string, updatedAt: string, voteStatus?: number | null, score: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } };

export type ReviewCommentSnippetFragment = { __typename?: 'ReviewComment', id: number, parentId?: number | null, creatorId: number, reviewId: number, text: string, score: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } };

export type ReviewSnippetFragment = { __typename?: 'Review', id: number, referenceId: string, movieId: number, text: string, movie_poster: string, backdrop: string, movie_title: string, movie_release_year: number, ratingGiven: number, score: number, watchedOn?: string | null, containsSpoilers: boolean, tags: string, createdAt: string, updatedAt: string, voteStatus?: number | null, noOfComments: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } };

export type UserFragmentFragment = { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null };

export type UserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null };

export type CreateReviewCommentMutationVariables = Exact<{
  input: ReviewCommentInput;
}>;


export type CreateReviewCommentMutation = { __typename?: 'Mutation', createReviewComment: { __typename?: 'ReviewComment', id: number, parentId?: number | null, reviewId: number, text: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } };

export type DeleteReviewCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  reviewId: Scalars['Int'];
}>;


export type DeleteReviewCommentMutation = { __typename?: 'Mutation', deleteReviewComment: boolean };

export type ReviewCommentVoteMutationVariables = Exact<{
  value: Scalars['Int'];
  reviewCommentId: Scalars['Int'];
}>;


export type ReviewCommentVoteMutation = { __typename?: 'Mutation', reviewCommentVote: boolean };

export type CreateDiaryMutationVariables = Exact<{
  input: CreateDiaryInput;
}>;


export type CreateDiaryMutation = { __typename?: 'Mutation', createDiary: { __typename?: 'Diary', id: number, filmId: number, creatorId: number, filmTitle: string, posterPath: string, ratingGiven: number, watchedOn: string, rewatch: boolean, reviewLink?: string | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string } } };

export type CreateFilmMutationVariables = Exact<{
  input: Array<FilmInput> | FilmInput;
}>;


export type CreateFilmMutation = { __typename?: 'Mutation', createFilm?: boolean | null };

export type FilmQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type FilmQuery = { __typename?: 'Query', film?: { __typename?: 'Films', movieId: number, movieTitle: string, overview?: string | null, posterPath?: string | null, backdropPath?: string | null, releaseDate: string, watchCount: number, listCount: number, likeCount: number, createdAt: string, updatedAt: string } | null };

export type AddEntryToFilmListMutationVariables = Exact<{
  listId: Scalars['String'];
  filmId: Scalars['Int'];
}>;


export type AddEntryToFilmListMutation = { __typename?: 'Mutation', addEntryToFilmList?: boolean | null };

export type CreateFilmListMutationVariables = Exact<{
  input: FilmListInput;
  filmIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreateFilmListMutation = { __typename?: 'Mutation', createFilmList: { __typename?: 'FilmListResponse', filmList?: { __typename?: 'FilmList', id: string, title: string, description?: string | null, tags: string, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null } };

export type CreateFilmListCommentMutationVariables = Exact<{
  input: FilmListCommentInput;
}>;


export type CreateFilmListCommentMutation = { __typename?: 'Mutation', createFilmListComment: { __typename?: 'FilmListComment', id: number, creatorId: number, filmListId: string, text: string, score: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } };

export type DeleteFilmListEntryMutationVariables = Exact<{
  filmListId: Scalars['String'];
  id: Scalars['Int'];
}>;


export type DeleteFilmListEntryMutation = { __typename?: 'Mutation', deleteFilmListEntry: boolean };

export type FilmListVoteMutationVariables = Exact<{
  value: Scalars['Int'];
  filmListId: Scalars['String'];
}>;


export type FilmListVoteMutation = { __typename?: 'Mutation', filmListVote: boolean };

export type UpdateFilmListMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateFilmListMutation = { __typename?: 'Mutation', updateFilmList?: boolean | null };

export type CreateReviewMutationVariables = Exact<{
  input: ReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: number, createdAt: string, updatedAt: string, watchedOn?: string | null, text: string, score: number, creatorId: number, referenceId: string } };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: boolean };

export type UpdateReviewMutationVariables = Exact<{
  referenceId: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', updateReview?: { __typename?: 'Review', id: number, text: string } | null };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  reviewId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type SignS3MutationVariables = Exact<{
  filetype: Scalars['String'];
  filename: Scalars['String'];
}>;


export type SignS3Mutation = { __typename?: 'Mutation', signS3: { __typename?: 'S3Payload', signedRequest: string, url: string } };

export type CheckIfFollowingUserQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type CheckIfFollowingUserQuery = { __typename?: 'Query', checkIfFollowingUser: boolean };

export type EditUserDetailsMutationVariables = Exact<{
  input: UserDetailsInput;
}>;


export type EditUserDetailsMutation = { __typename?: 'Mutation', editUserDetails: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type FollowMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type SettingsChangeEmailMutationVariables = Exact<{
  newEmail: Scalars['String'];
  currentEmail: Scalars['String'];
}>;


export type SettingsChangeEmailMutation = { __typename?: 'Mutation', settingsChangeEmail: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, updatedAt: string, createdAt: string } | null } };

export type SettingsChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  settingsNewPassword: Scalars['String'];
}>;


export type SettingsChangePasswordMutation = { __typename?: 'Mutation', settingsChangePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type CreateWatchedMutationVariables = Exact<{
  input: CreateWatchedInput;
}>;


export type CreateWatchedMutation = { __typename?: 'Mutation', createWatched?: { __typename?: 'Watched', id: number, filmId: number, creatorId: number, ratingGiven?: number | null, filmTitle: string, posterPath: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null } } | null };

export type AddToWatchlistMutationVariables = Exact<{
  input: AddToWatchlistInput;
}>;


export type AddToWatchlistMutation = { __typename?: 'Mutation', addToWatchlist?: { __typename?: 'Watchlist', id: number, filmId: number, creatorId: number, filmTitle: string, posterPath: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null } } | null };

export type DiaryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
}>;


export type DiaryQuery = { __typename?: 'Query', diary: { __typename?: 'PaginatedDiary', hasMore: boolean, diary: Array<{ __typename?: 'Diary', id: number, filmId: number, creatorId: number, filmTitle: string, watchedOn: string, posterPath: string, ratingGiven: number, rewatch: boolean, reviewLink?: string | null, createdAt: string, updatedAt: string }> } };

export type FilmListQueryVariables = Exact<{
  id: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FilmListQuery = { __typename?: 'Query', filmList?: { __typename?: 'BatchedListResponse', hasMore: boolean, filmList?: { __typename?: 'FilmList', id: string, title: string, description?: string | null, tags: string, voteStatus?: number | null, score: number, noOfComments: number, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null, filmListEntries: Array<{ __typename?: 'FilmListEntries', id: number, filmId: number, listId: string, createdAt: string, updatedAt: string, film: { __typename?: 'Films', movieId: number, movieTitle: string, overview?: string | null, posterPath?: string | null, backdropPath?: string | null, releaseDate: string, watchCount: number, likeCount: number, listCount: number } }> } | null };

export type FilmListCommentsQueryVariables = Exact<{
  filmListId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['String']>;
}>;


export type FilmListCommentsQuery = { __typename?: 'Query', filmListComments: { __typename?: 'PaginatedFilmListComments', hasMore: boolean, filmListComments: Array<{ __typename?: 'FilmListComment', id: number, creatorId: number, filmListId: string, text: string, score: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type FilmListsQueryVariables = Exact<{
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  dateLimit?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type FilmListsQuery = { __typename?: 'Query', filmLists: { __typename?: 'PaginatedFilmLists', hasMore: boolean, filmLists: Array<{ __typename?: 'FilmList', id: string, title: string, score: number, description?: string | null, numberOfFilms: number, noOfComments: number, filmOnePosterPath?: string | null, filmTwoPosterPath?: string | null, filmThreePosterPath?: string | null, filmFourPosterPath?: string | null, filmFivePosterPath?: string | null, creatorId: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type FilmListTagsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type FilmListTagsQuery = { __typename?: 'Query', filmListTags: { __typename?: 'PaginatedFilmListTags', hasMore: boolean, filmListTags: Array<{ __typename?: 'FilmListTags', id: number, text: string, count?: number | null, createdAt: string, updatedAt: string }> } };

export type ReviewQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReviewQuery = { __typename?: 'Query', review?: { __typename?: 'Review', id: number, referenceId: string, movieId: number, text: string, movie_poster: string, backdrop: string, movie_title: string, movie_release_year: number, ratingGiven: number, score: number, watchedOn?: string | null, containsSpoilers: boolean, tags: string, createdAt: string, updatedAt: string, voteStatus?: number | null, noOfComments: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null };

export type ReviewCommentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReviewCommentQuery = { __typename?: 'Query', reviewComment?: { __typename?: 'ReviewComment', id: number, parentId?: number | null, creatorId: number, reviewId: number, text: string, score: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null };

export type ReviewCommentsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  reviewId: Scalars['Int'];
}>;


export type ReviewCommentsQuery = { __typename?: 'Query', reviewComments: { __typename?: 'PaginatedReviewComments', hasMore: boolean, reviewComments: Array<{ __typename?: 'ReviewComment', id: number, parentId?: number | null, creatorId: number, reviewId: number, text: string, score: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type ReviewsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  movieId?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: { __typename?: 'PaginatedReviews', hasMore: boolean, reviews: Array<{ __typename?: 'Review', id: number, referenceId: string, movieId: number, text: string, movie_poster: string, backdrop: string, movie_title: string, movie_release_year: number, ratingGiven: number, score: number, watchedOn?: string | null, containsSpoilers: boolean, tags: string, createdAt: string, updatedAt: string, voteStatus?: number | null, noOfComments: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type FollowersQueryVariables = Exact<{
  userId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
}>;


export type FollowersQuery = { __typename?: 'Query', followers: { __typename?: 'PaginatedFollowers', hasMore: boolean, subscription: Array<{ __typename?: 'Subscription', follower: { __typename?: 'User', id: number, username: string, avatar?: string | null, displayName?: string | null } }> } };

export type FollowingsQueryVariables = Exact<{
  userId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
}>;


export type FollowingsQuery = { __typename?: 'Query', followings: { __typename?: 'PaginatedFollowing', hasMore: boolean, subscription: Array<{ __typename?: 'Subscription', following: { __typename?: 'User', id: number, username: string, avatar?: string | null, displayName?: string | null } }> } };

export type CheckIfUsernameTakenQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckIfUsernameTakenQuery = { __typename?: 'Query', checkIfUsernameTaken?: boolean | null };

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', getUserByUsername?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, verified: boolean, username: string, displayName?: string | null, email: string, avatar?: string | null, header?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched: number, totalHoursWatched: number, totalListsCreated: number, following: number, followers: number, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null };

export type NumberOfWatchedByYearQueryVariables = Exact<{
  year: Scalars['String'];
}>;


export type NumberOfWatchedByYearQuery = { __typename?: 'Query', numberOfWatchedByYear: number };

export type WatchedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
}>;


export type WatchedQuery = { __typename?: 'Query', watched: { __typename?: 'PaginatedWatched', hasMore: boolean, watched: Array<{ __typename?: 'Watched', id: number, filmId: number, creatorId: number, filmTitle: string, posterPath: string, createdAt: string, updatedAt: string, ratingGiven?: number | null, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type WatchlistQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDir?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
}>;


export type WatchlistQuery = { __typename?: 'Query', watchlist: { __typename?: 'PaginatedWatchlist', hasMore: boolean, watchlist: Array<{ __typename?: 'Watchlist', id: number, filmId: number, creatorId: number, filmTitle: string, posterPath: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export const FilmListSnippetFragmentDoc = gql`
    fragment FilmListSnippet on FilmList {
  id
  title
  description
  tags
  creatorId
  createdAt
  updatedAt
  voteStatus
  score
  creator {
    id
    username
    displayName
    avatar
  }
}
    `;
export const ReviewCommentSnippetFragmentDoc = gql`
    fragment ReviewCommentSnippet on ReviewComment {
  id
  parentId
  creatorId
  reviewId
  text
  score
  voteStatus
  createdAt
  updatedAt
  creator {
    id
    username
    displayName
    avatar
  }
}
    `;
export const ReviewSnippetFragmentDoc = gql`
    fragment ReviewSnippet on Review {
  id
  referenceId
  movieId
  text
  movie_poster
  backdrop
  movie_title
  movie_release_year
  ratingGiven
  score
  watchedOn
  containsSpoilers
  tags
  createdAt
  updatedAt
  voteStatus
  noOfComments
  creator {
    id
    username
    displayName
    avatar
  }
}
    `;
export const ErrorFragmentDoc = gql`
    fragment Error on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  verified
  username
  displayName
  email
  avatar
  header
  bio
  bioLink
  totalFilmsWatched
  totalHoursWatched
  totalListsCreated
  following
  followers
  createdAt
  updatedAt
  usernameChangeDate
  onboarded
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...Error
  }
  user {
    ...UserFragment
  }
}
    ${ErrorFragmentDoc}
${UserFragmentFragmentDoc}`;
export const CreateReviewCommentDocument = gql`
    mutation CreateReviewComment($input: ReviewCommentInput!) {
  createReviewComment(input: $input) {
    id
    parentId
    reviewId
    text
    createdAt
    updatedAt
    creator {
      id
      username
      displayName
      avatar
    }
  }
}
    `;
export type CreateReviewCommentMutationFn = Apollo.MutationFunction<CreateReviewCommentMutation, CreateReviewCommentMutationVariables>;

/**
 * __useCreateReviewCommentMutation__
 *
 * To run a mutation, you first call `useCreateReviewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewCommentMutation, { data, loading, error }] = useCreateReviewCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewCommentMutation, CreateReviewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewCommentMutation, CreateReviewCommentMutationVariables>(CreateReviewCommentDocument, options);
      }
export type CreateReviewCommentMutationHookResult = ReturnType<typeof useCreateReviewCommentMutation>;
export type CreateReviewCommentMutationResult = Apollo.MutationResult<CreateReviewCommentMutation>;
export type CreateReviewCommentMutationOptions = Apollo.BaseMutationOptions<CreateReviewCommentMutation, CreateReviewCommentMutationVariables>;
export const DeleteReviewCommentDocument = gql`
    mutation DeleteReviewComment($id: Int!, $reviewId: Int!) {
  deleteReviewComment(id: $id, reviewId: $reviewId)
}
    `;
export type DeleteReviewCommentMutationFn = Apollo.MutationFunction<DeleteReviewCommentMutation, DeleteReviewCommentMutationVariables>;

/**
 * __useDeleteReviewCommentMutation__
 *
 * To run a mutation, you first call `useDeleteReviewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewCommentMutation, { data, loading, error }] = useDeleteReviewCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useDeleteReviewCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewCommentMutation, DeleteReviewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewCommentMutation, DeleteReviewCommentMutationVariables>(DeleteReviewCommentDocument, options);
      }
export type DeleteReviewCommentMutationHookResult = ReturnType<typeof useDeleteReviewCommentMutation>;
export type DeleteReviewCommentMutationResult = Apollo.MutationResult<DeleteReviewCommentMutation>;
export type DeleteReviewCommentMutationOptions = Apollo.BaseMutationOptions<DeleteReviewCommentMutation, DeleteReviewCommentMutationVariables>;
export const ReviewCommentVoteDocument = gql`
    mutation ReviewCommentVote($value: Int!, $reviewCommentId: Int!) {
  reviewCommentVote(value: $value, reviewCommentId: $reviewCommentId)
}
    `;
export type ReviewCommentVoteMutationFn = Apollo.MutationFunction<ReviewCommentVoteMutation, ReviewCommentVoteMutationVariables>;

/**
 * __useReviewCommentVoteMutation__
 *
 * To run a mutation, you first call `useReviewCommentVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewCommentVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewCommentVoteMutation, { data, loading, error }] = useReviewCommentVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      reviewCommentId: // value for 'reviewCommentId'
 *   },
 * });
 */
export function useReviewCommentVoteMutation(baseOptions?: Apollo.MutationHookOptions<ReviewCommentVoteMutation, ReviewCommentVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReviewCommentVoteMutation, ReviewCommentVoteMutationVariables>(ReviewCommentVoteDocument, options);
      }
export type ReviewCommentVoteMutationHookResult = ReturnType<typeof useReviewCommentVoteMutation>;
export type ReviewCommentVoteMutationResult = Apollo.MutationResult<ReviewCommentVoteMutation>;
export type ReviewCommentVoteMutationOptions = Apollo.BaseMutationOptions<ReviewCommentVoteMutation, ReviewCommentVoteMutationVariables>;
export const CreateDiaryDocument = gql`
    mutation CreateDiary($input: CreateDiaryInput!) {
  createDiary(input: $input) {
    id
    filmId
    creatorId
    filmTitle
    posterPath
    ratingGiven
    watchedOn
    rewatch
    reviewLink
    createdAt
    updatedAt
    creator {
      id
      username
    }
  }
}
    `;
export type CreateDiaryMutationFn = Apollo.MutationFunction<CreateDiaryMutation, CreateDiaryMutationVariables>;

/**
 * __useCreateDiaryMutation__
 *
 * To run a mutation, you first call `useCreateDiaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiaryMutation, { data, loading, error }] = useCreateDiaryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiaryMutation(baseOptions?: Apollo.MutationHookOptions<CreateDiaryMutation, CreateDiaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDiaryMutation, CreateDiaryMutationVariables>(CreateDiaryDocument, options);
      }
export type CreateDiaryMutationHookResult = ReturnType<typeof useCreateDiaryMutation>;
export type CreateDiaryMutationResult = Apollo.MutationResult<CreateDiaryMutation>;
export type CreateDiaryMutationOptions = Apollo.BaseMutationOptions<CreateDiaryMutation, CreateDiaryMutationVariables>;
export const CreateFilmDocument = gql`
    mutation CreateFilm($input: [FilmInput!]!) {
  createFilm(input: $input)
}
    `;
export type CreateFilmMutationFn = Apollo.MutationFunction<CreateFilmMutation, CreateFilmMutationVariables>;

/**
 * __useCreateFilmMutation__
 *
 * To run a mutation, you first call `useCreateFilmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilmMutation, { data, loading, error }] = useCreateFilmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFilmMutation(baseOptions?: Apollo.MutationHookOptions<CreateFilmMutation, CreateFilmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFilmMutation, CreateFilmMutationVariables>(CreateFilmDocument, options);
      }
export type CreateFilmMutationHookResult = ReturnType<typeof useCreateFilmMutation>;
export type CreateFilmMutationResult = Apollo.MutationResult<CreateFilmMutation>;
export type CreateFilmMutationOptions = Apollo.BaseMutationOptions<CreateFilmMutation, CreateFilmMutationVariables>;
export const FilmDocument = gql`
    query Film($movieId: Int!) {
  film(movieId: $movieId) {
    movieId
    movieTitle
    overview
    posterPath
    backdropPath
    releaseDate
    watchCount
    listCount
    likeCount
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFilmQuery__
 *
 * To run a query within a React component, call `useFilmQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useFilmQuery(baseOptions: Apollo.QueryHookOptions<FilmQuery, FilmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
      }
export function useFilmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmQuery, FilmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
        }
export type FilmQueryHookResult = ReturnType<typeof useFilmQuery>;
export type FilmLazyQueryHookResult = ReturnType<typeof useFilmLazyQuery>;
export type FilmQueryResult = Apollo.QueryResult<FilmQuery, FilmQueryVariables>;
export const AddEntryToFilmListDocument = gql`
    mutation AddEntryToFilmList($listId: String!, $filmId: Int!) {
  addEntryToFilmList(filmId: $filmId, listId: $listId)
}
    `;
export type AddEntryToFilmListMutationFn = Apollo.MutationFunction<AddEntryToFilmListMutation, AddEntryToFilmListMutationVariables>;

/**
 * __useAddEntryToFilmListMutation__
 *
 * To run a mutation, you first call `useAddEntryToFilmListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEntryToFilmListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEntryToFilmListMutation, { data, loading, error }] = useAddEntryToFilmListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      filmId: // value for 'filmId'
 *   },
 * });
 */
export function useAddEntryToFilmListMutation(baseOptions?: Apollo.MutationHookOptions<AddEntryToFilmListMutation, AddEntryToFilmListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEntryToFilmListMutation, AddEntryToFilmListMutationVariables>(AddEntryToFilmListDocument, options);
      }
export type AddEntryToFilmListMutationHookResult = ReturnType<typeof useAddEntryToFilmListMutation>;
export type AddEntryToFilmListMutationResult = Apollo.MutationResult<AddEntryToFilmListMutation>;
export type AddEntryToFilmListMutationOptions = Apollo.BaseMutationOptions<AddEntryToFilmListMutation, AddEntryToFilmListMutationVariables>;
export const CreateFilmListDocument = gql`
    mutation CreateFilmList($input: FilmListInput!, $filmIds: [Int!]!) {
  createFilmList(input: $input, filmIds: $filmIds) {
    filmList {
      id
      title
      description
      tags
      creator {
        id
        username
        displayName
        avatar
      }
      creatorId
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateFilmListMutationFn = Apollo.MutationFunction<CreateFilmListMutation, CreateFilmListMutationVariables>;

/**
 * __useCreateFilmListMutation__
 *
 * To run a mutation, you first call `useCreateFilmListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilmListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilmListMutation, { data, loading, error }] = useCreateFilmListMutation({
 *   variables: {
 *      input: // value for 'input'
 *      filmIds: // value for 'filmIds'
 *   },
 * });
 */
export function useCreateFilmListMutation(baseOptions?: Apollo.MutationHookOptions<CreateFilmListMutation, CreateFilmListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFilmListMutation, CreateFilmListMutationVariables>(CreateFilmListDocument, options);
      }
export type CreateFilmListMutationHookResult = ReturnType<typeof useCreateFilmListMutation>;
export type CreateFilmListMutationResult = Apollo.MutationResult<CreateFilmListMutation>;
export type CreateFilmListMutationOptions = Apollo.BaseMutationOptions<CreateFilmListMutation, CreateFilmListMutationVariables>;
export const CreateFilmListCommentDocument = gql`
    mutation CreateFilmListComment($input: FilmListCommentInput!) {
  createFilmListComment(input: $input) {
    id
    creatorId
    filmListId
    text
    score
    voteStatus
    createdAt
    updatedAt
    creator {
      id
      username
      displayName
      avatar
    }
  }
}
    `;
export type CreateFilmListCommentMutationFn = Apollo.MutationFunction<CreateFilmListCommentMutation, CreateFilmListCommentMutationVariables>;

/**
 * __useCreateFilmListCommentMutation__
 *
 * To run a mutation, you first call `useCreateFilmListCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilmListCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilmListCommentMutation, { data, loading, error }] = useCreateFilmListCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFilmListCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateFilmListCommentMutation, CreateFilmListCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFilmListCommentMutation, CreateFilmListCommentMutationVariables>(CreateFilmListCommentDocument, options);
      }
export type CreateFilmListCommentMutationHookResult = ReturnType<typeof useCreateFilmListCommentMutation>;
export type CreateFilmListCommentMutationResult = Apollo.MutationResult<CreateFilmListCommentMutation>;
export type CreateFilmListCommentMutationOptions = Apollo.BaseMutationOptions<CreateFilmListCommentMutation, CreateFilmListCommentMutationVariables>;
export const DeleteFilmListEntryDocument = gql`
    mutation DeleteFilmListEntry($filmListId: String!, $id: Int!) {
  deleteFilmListEntry(filmListId: $filmListId, id: $id)
}
    `;
export type DeleteFilmListEntryMutationFn = Apollo.MutationFunction<DeleteFilmListEntryMutation, DeleteFilmListEntryMutationVariables>;

/**
 * __useDeleteFilmListEntryMutation__
 *
 * To run a mutation, you first call `useDeleteFilmListEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilmListEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilmListEntryMutation, { data, loading, error }] = useDeleteFilmListEntryMutation({
 *   variables: {
 *      filmListId: // value for 'filmListId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFilmListEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFilmListEntryMutation, DeleteFilmListEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFilmListEntryMutation, DeleteFilmListEntryMutationVariables>(DeleteFilmListEntryDocument, options);
      }
export type DeleteFilmListEntryMutationHookResult = ReturnType<typeof useDeleteFilmListEntryMutation>;
export type DeleteFilmListEntryMutationResult = Apollo.MutationResult<DeleteFilmListEntryMutation>;
export type DeleteFilmListEntryMutationOptions = Apollo.BaseMutationOptions<DeleteFilmListEntryMutation, DeleteFilmListEntryMutationVariables>;
export const FilmListVoteDocument = gql`
    mutation FilmListVote($value: Int!, $filmListId: String!) {
  filmListVote(value: $value, filmListId: $filmListId)
}
    `;
export type FilmListVoteMutationFn = Apollo.MutationFunction<FilmListVoteMutation, FilmListVoteMutationVariables>;

/**
 * __useFilmListVoteMutation__
 *
 * To run a mutation, you first call `useFilmListVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFilmListVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [filmListVoteMutation, { data, loading, error }] = useFilmListVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      filmListId: // value for 'filmListId'
 *   },
 * });
 */
export function useFilmListVoteMutation(baseOptions?: Apollo.MutationHookOptions<FilmListVoteMutation, FilmListVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FilmListVoteMutation, FilmListVoteMutationVariables>(FilmListVoteDocument, options);
      }
export type FilmListVoteMutationHookResult = ReturnType<typeof useFilmListVoteMutation>;
export type FilmListVoteMutationResult = Apollo.MutationResult<FilmListVoteMutation>;
export type FilmListVoteMutationOptions = Apollo.BaseMutationOptions<FilmListVoteMutation, FilmListVoteMutationVariables>;
export const UpdateFilmListDocument = gql`
    mutation UpdateFilmList($id: String!, $title: String!, $description: String!) {
  updateFilmList(id: $id, title: $title, description: $description)
}
    `;
export type UpdateFilmListMutationFn = Apollo.MutationFunction<UpdateFilmListMutation, UpdateFilmListMutationVariables>;

/**
 * __useUpdateFilmListMutation__
 *
 * To run a mutation, you first call `useUpdateFilmListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFilmListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFilmListMutation, { data, loading, error }] = useUpdateFilmListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateFilmListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFilmListMutation, UpdateFilmListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFilmListMutation, UpdateFilmListMutationVariables>(UpdateFilmListDocument, options);
      }
export type UpdateFilmListMutationHookResult = ReturnType<typeof useUpdateFilmListMutation>;
export type UpdateFilmListMutationResult = Apollo.MutationResult<UpdateFilmListMutation>;
export type UpdateFilmListMutationOptions = Apollo.BaseMutationOptions<UpdateFilmListMutation, UpdateFilmListMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($input: ReviewInput!) {
  createReview(input: $input) {
    id
    createdAt
    updatedAt
    watchedOn
    text
    score
    creatorId
    referenceId
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($id: Int!) {
  deleteReview(id: $id)
}
    `;
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const UpdateReviewDocument = gql`
    mutation UpdateReview($referenceId: String!, $text: String!) {
  updateReview(referenceId: $referenceId, text: $text) {
    id
    text
  }
}
    `;
export type UpdateReviewMutationFn = Apollo.MutationFunction<UpdateReviewMutation, UpdateReviewMutationVariables>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      referenceId: // value for 'referenceId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, options);
      }
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<UpdateReviewMutation, UpdateReviewMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $reviewId: Int!) {
  vote(value: $value, reviewId: $reviewId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const SignS3Document = gql`
    mutation SignS3($filetype: String!, $filename: String!) {
  signS3(filetype: $filetype, filename: $filename) {
    signedRequest
    url
  }
}
    `;
export type SignS3MutationFn = Apollo.MutationFunction<SignS3Mutation, SignS3MutationVariables>;

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      filetype: // value for 'filetype'
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useSignS3Mutation(baseOptions?: Apollo.MutationHookOptions<SignS3Mutation, SignS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignS3Mutation, SignS3MutationVariables>(SignS3Document, options);
      }
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = Apollo.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = Apollo.BaseMutationOptions<SignS3Mutation, SignS3MutationVariables>;
export const CheckIfFollowingUserDocument = gql`
    query CheckIfFollowingUser($userId: Int!) {
  checkIfFollowingUser(userId: $userId)
}
    `;

/**
 * __useCheckIfFollowingUserQuery__
 *
 * To run a query within a React component, call `useCheckIfFollowingUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfFollowingUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfFollowingUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCheckIfFollowingUserQuery(baseOptions: Apollo.QueryHookOptions<CheckIfFollowingUserQuery, CheckIfFollowingUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfFollowingUserQuery, CheckIfFollowingUserQueryVariables>(CheckIfFollowingUserDocument, options);
      }
export function useCheckIfFollowingUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfFollowingUserQuery, CheckIfFollowingUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfFollowingUserQuery, CheckIfFollowingUserQueryVariables>(CheckIfFollowingUserDocument, options);
        }
export type CheckIfFollowingUserQueryHookResult = ReturnType<typeof useCheckIfFollowingUserQuery>;
export type CheckIfFollowingUserLazyQueryHookResult = ReturnType<typeof useCheckIfFollowingUserLazyQuery>;
export type CheckIfFollowingUserQueryResult = Apollo.QueryResult<CheckIfFollowingUserQuery, CheckIfFollowingUserQueryVariables>;
export const EditUserDetailsDocument = gql`
    mutation EditUserDetails($input: UserDetailsInput!) {
  editUserDetails(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type EditUserDetailsMutationFn = Apollo.MutationFunction<EditUserDetailsMutation, EditUserDetailsMutationVariables>;

/**
 * __useEditUserDetailsMutation__
 *
 * To run a mutation, you first call `useEditUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserDetailsMutation, { data, loading, error }] = useEditUserDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditUserDetailsMutation(baseOptions?: Apollo.MutationHookOptions<EditUserDetailsMutation, EditUserDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserDetailsMutation, EditUserDetailsMutationVariables>(EditUserDetailsDocument, options);
      }
export type EditUserDetailsMutationHookResult = ReturnType<typeof useEditUserDetailsMutation>;
export type EditUserDetailsMutationResult = Apollo.MutationResult<EditUserDetailsMutation>;
export type EditUserDetailsMutationOptions = Apollo.BaseMutationOptions<EditUserDetailsMutation, EditUserDetailsMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($userId: Int!) {
  follow(userId: $userId)
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UsernamePasswordInput!) {
  register(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SettingsChangeEmailDocument = gql`
    mutation SettingsChangeEmail($newEmail: String!, $currentEmail: String!) {
  settingsChangeEmail(newEmail: $newEmail, currentEmail: $currentEmail) {
    errors {
      field
      message
    }
    user {
      id
      username
      displayName
      email
      avatar
      updatedAt
      createdAt
    }
  }
}
    `;
export type SettingsChangeEmailMutationFn = Apollo.MutationFunction<SettingsChangeEmailMutation, SettingsChangeEmailMutationVariables>;

/**
 * __useSettingsChangeEmailMutation__
 *
 * To run a mutation, you first call `useSettingsChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingsChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingsChangeEmailMutation, { data, loading, error }] = useSettingsChangeEmailMutation({
 *   variables: {
 *      newEmail: // value for 'newEmail'
 *      currentEmail: // value for 'currentEmail'
 *   },
 * });
 */
export function useSettingsChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<SettingsChangeEmailMutation, SettingsChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SettingsChangeEmailMutation, SettingsChangeEmailMutationVariables>(SettingsChangeEmailDocument, options);
      }
export type SettingsChangeEmailMutationHookResult = ReturnType<typeof useSettingsChangeEmailMutation>;
export type SettingsChangeEmailMutationResult = Apollo.MutationResult<SettingsChangeEmailMutation>;
export type SettingsChangeEmailMutationOptions = Apollo.BaseMutationOptions<SettingsChangeEmailMutation, SettingsChangeEmailMutationVariables>;
export const SettingsChangePasswordDocument = gql`
    mutation SettingsChangePassword($currentPassword: String!, $settingsNewPassword: String!) {
  settingsChangePassword(
    currentPassword: $currentPassword
    settingsNewPassword: $settingsNewPassword
  ) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type SettingsChangePasswordMutationFn = Apollo.MutationFunction<SettingsChangePasswordMutation, SettingsChangePasswordMutationVariables>;

/**
 * __useSettingsChangePasswordMutation__
 *
 * To run a mutation, you first call `useSettingsChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingsChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingsChangePasswordMutation, { data, loading, error }] = useSettingsChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      settingsNewPassword: // value for 'settingsNewPassword'
 *   },
 * });
 */
export function useSettingsChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<SettingsChangePasswordMutation, SettingsChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SettingsChangePasswordMutation, SettingsChangePasswordMutationVariables>(SettingsChangePasswordDocument, options);
      }
export type SettingsChangePasswordMutationHookResult = ReturnType<typeof useSettingsChangePasswordMutation>;
export type SettingsChangePasswordMutationResult = Apollo.MutationResult<SettingsChangePasswordMutation>;
export type SettingsChangePasswordMutationOptions = Apollo.BaseMutationOptions<SettingsChangePasswordMutation, SettingsChangePasswordMutationVariables>;
export const CreateWatchedDocument = gql`
    mutation CreateWatched($input: CreateWatchedInput!) {
  createWatched(input: $input) {
    id
    filmId
    creatorId
    ratingGiven
    filmTitle
    posterPath
    creator {
      id
      username
      displayName
      email
      avatar
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateWatchedMutationFn = Apollo.MutationFunction<CreateWatchedMutation, CreateWatchedMutationVariables>;

/**
 * __useCreateWatchedMutation__
 *
 * To run a mutation, you first call `useCreateWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWatchedMutation, { data, loading, error }] = useCreateWatchedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWatchedMutation(baseOptions?: Apollo.MutationHookOptions<CreateWatchedMutation, CreateWatchedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWatchedMutation, CreateWatchedMutationVariables>(CreateWatchedDocument, options);
      }
export type CreateWatchedMutationHookResult = ReturnType<typeof useCreateWatchedMutation>;
export type CreateWatchedMutationResult = Apollo.MutationResult<CreateWatchedMutation>;
export type CreateWatchedMutationOptions = Apollo.BaseMutationOptions<CreateWatchedMutation, CreateWatchedMutationVariables>;
export const AddToWatchlistDocument = gql`
    mutation AddToWatchlist($input: AddToWatchlistInput!) {
  addToWatchlist(input: $input) {
    id
    filmId
    creatorId
    filmTitle
    posterPath
    creator {
      id
      username
      displayName
      email
      avatar
    }
    createdAt
    updatedAt
  }
}
    `;
export type AddToWatchlistMutationFn = Apollo.MutationFunction<AddToWatchlistMutation, AddToWatchlistMutationVariables>;

/**
 * __useAddToWatchlistMutation__
 *
 * To run a mutation, you first call `useAddToWatchlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWatchlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWatchlistMutation, { data, loading, error }] = useAddToWatchlistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToWatchlistMutation(baseOptions?: Apollo.MutationHookOptions<AddToWatchlistMutation, AddToWatchlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToWatchlistMutation, AddToWatchlistMutationVariables>(AddToWatchlistDocument, options);
      }
export type AddToWatchlistMutationHookResult = ReturnType<typeof useAddToWatchlistMutation>;
export type AddToWatchlistMutationResult = Apollo.MutationResult<AddToWatchlistMutation>;
export type AddToWatchlistMutationOptions = Apollo.BaseMutationOptions<AddToWatchlistMutation, AddToWatchlistMutationVariables>;
export const DiaryDocument = gql`
    query Diary($limit: Int, $cursor: String, $orderBy: String, $orderDir: String, $userId: Int!) {
  diary(
    limit: $limit
    cursor: $cursor
    orderBy: $orderBy
    orderDir: $orderDir
    userId: $userId
  ) {
    diary {
      id
      filmId
      creatorId
      filmTitle
      watchedOn
      posterPath
      ratingGiven
      rewatch
      reviewLink
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __useDiaryQuery__
 *
 * To run a query within a React component, call `useDiaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiaryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDiaryQuery(baseOptions: Apollo.QueryHookOptions<DiaryQuery, DiaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiaryQuery, DiaryQueryVariables>(DiaryDocument, options);
      }
export function useDiaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiaryQuery, DiaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiaryQuery, DiaryQueryVariables>(DiaryDocument, options);
        }
export type DiaryQueryHookResult = ReturnType<typeof useDiaryQuery>;
export type DiaryLazyQueryHookResult = ReturnType<typeof useDiaryLazyQuery>;
export type DiaryQueryResult = Apollo.QueryResult<DiaryQuery, DiaryQueryVariables>;
export const FilmListDocument = gql`
    query FilmList($id: String!, $cursor: String, $limit: Int) {
  filmList(id: $id, cursor: $cursor, limit: $limit) {
    filmList {
      id
      title
      description
      tags
      voteStatus
      score
      noOfComments
      creatorId
      createdAt
      updatedAt
      creator {
        id
        username
        displayName
        avatar
      }
    }
    filmListEntries {
      id
      filmId
      listId
      createdAt
      updatedAt
      film {
        movieId
        movieTitle
        overview
        posterPath
        backdropPath
        releaseDate
        watchCount
        likeCount
        listCount
      }
    }
    hasMore
  }
}
    `;

/**
 * __useFilmListQuery__
 *
 * To run a query within a React component, call `useFilmListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmListQuery({
 *   variables: {
 *      id: // value for 'id'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFilmListQuery(baseOptions: Apollo.QueryHookOptions<FilmListQuery, FilmListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmListQuery, FilmListQueryVariables>(FilmListDocument, options);
      }
export function useFilmListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmListQuery, FilmListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmListQuery, FilmListQueryVariables>(FilmListDocument, options);
        }
export type FilmListQueryHookResult = ReturnType<typeof useFilmListQuery>;
export type FilmListLazyQueryHookResult = ReturnType<typeof useFilmListLazyQuery>;
export type FilmListQueryResult = Apollo.QueryResult<FilmListQuery, FilmListQueryVariables>;
export const FilmListCommentsDocument = gql`
    query FilmListComments($filmListId: String!, $limit: Int!, $cursor: String, $order: String) {
  filmListComments(
    filmListId: $filmListId
    limit: $limit
    cursor: $cursor
    order: $order
  ) {
    filmListComments {
      id
      creatorId
      filmListId
      text
      score
      voteStatus
      createdAt
      updatedAt
      creator {
        id
        username
        displayName
        avatar
      }
    }
    hasMore
  }
}
    `;

/**
 * __useFilmListCommentsQuery__
 *
 * To run a query within a React component, call `useFilmListCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmListCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmListCommentsQuery({
 *   variables: {
 *      filmListId: // value for 'filmListId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useFilmListCommentsQuery(baseOptions: Apollo.QueryHookOptions<FilmListCommentsQuery, FilmListCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmListCommentsQuery, FilmListCommentsQueryVariables>(FilmListCommentsDocument, options);
      }
export function useFilmListCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmListCommentsQuery, FilmListCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmListCommentsQuery, FilmListCommentsQueryVariables>(FilmListCommentsDocument, options);
        }
export type FilmListCommentsQueryHookResult = ReturnType<typeof useFilmListCommentsQuery>;
export type FilmListCommentsLazyQueryHookResult = ReturnType<typeof useFilmListCommentsLazyQuery>;
export type FilmListCommentsQueryResult = Apollo.QueryResult<FilmListCommentsQuery, FilmListCommentsQueryVariables>;
export const FilmListsDocument = gql`
    query FilmLists($orderBy: String, $orderDir: String, $limit: Int, $dateLimit: String, $cursor: String, $username: String) {
  filmLists(
    orderBy: $orderBy
    orderDir: $orderDir
    limit: $limit
    dateLimit: $dateLimit
    cursor: $cursor
    username: $username
  ) {
    filmLists {
      id
      title
      score
      description
      numberOfFilms
      noOfComments
      filmOnePosterPath
      filmTwoPosterPath
      filmThreePosterPath
      filmFourPosterPath
      filmFivePosterPath
      creatorId
      creator {
        id
        username
        displayName
        avatar
      }
    }
    hasMore
  }
}
    `;

/**
 * __useFilmListsQuery__
 *
 * To run a query within a React component, call `useFilmListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmListsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *      limit: // value for 'limit'
 *      dateLimit: // value for 'dateLimit'
 *      cursor: // value for 'cursor'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFilmListsQuery(baseOptions?: Apollo.QueryHookOptions<FilmListsQuery, FilmListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmListsQuery, FilmListsQueryVariables>(FilmListsDocument, options);
      }
export function useFilmListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmListsQuery, FilmListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmListsQuery, FilmListsQueryVariables>(FilmListsDocument, options);
        }
export type FilmListsQueryHookResult = ReturnType<typeof useFilmListsQuery>;
export type FilmListsLazyQueryHookResult = ReturnType<typeof useFilmListsLazyQuery>;
export type FilmListsQueryResult = Apollo.QueryResult<FilmListsQuery, FilmListsQueryVariables>;
export const FilmListTagsDocument = gql`
    query FilmListTags($limit: Int, $cursor: String) {
  filmListTags(limit: $limit, cursor: $cursor) {
    filmListTags {
      id
      text
      count
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __useFilmListTagsQuery__
 *
 * To run a query within a React component, call `useFilmListTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmListTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmListTagsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFilmListTagsQuery(baseOptions?: Apollo.QueryHookOptions<FilmListTagsQuery, FilmListTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmListTagsQuery, FilmListTagsQueryVariables>(FilmListTagsDocument, options);
      }
export function useFilmListTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmListTagsQuery, FilmListTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmListTagsQuery, FilmListTagsQueryVariables>(FilmListTagsDocument, options);
        }
export type FilmListTagsQueryHookResult = ReturnType<typeof useFilmListTagsQuery>;
export type FilmListTagsLazyQueryHookResult = ReturnType<typeof useFilmListTagsLazyQuery>;
export type FilmListTagsQueryResult = Apollo.QueryResult<FilmListTagsQuery, FilmListTagsQueryVariables>;
export const ReviewDocument = gql`
    query Review($id: String!) {
  review(id: $id) {
    ...ReviewSnippet
  }
}
    ${ReviewSnippetFragmentDoc}`;

/**
 * __useReviewQuery__
 *
 * To run a query within a React component, call `useReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReviewQuery(baseOptions: Apollo.QueryHookOptions<ReviewQuery, ReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewQuery, ReviewQueryVariables>(ReviewDocument, options);
      }
export function useReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewQuery, ReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewQuery, ReviewQueryVariables>(ReviewDocument, options);
        }
export type ReviewQueryHookResult = ReturnType<typeof useReviewQuery>;
export type ReviewLazyQueryHookResult = ReturnType<typeof useReviewLazyQuery>;
export type ReviewQueryResult = Apollo.QueryResult<ReviewQuery, ReviewQueryVariables>;
export const ReviewCommentDocument = gql`
    query ReviewComment($id: Int!) {
  reviewComment(id: $id) {
    ...ReviewCommentSnippet
  }
}
    ${ReviewCommentSnippetFragmentDoc}`;

/**
 * __useReviewCommentQuery__
 *
 * To run a query within a React component, call `useReviewCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReviewCommentQuery(baseOptions: Apollo.QueryHookOptions<ReviewCommentQuery, ReviewCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewCommentQuery, ReviewCommentQueryVariables>(ReviewCommentDocument, options);
      }
export function useReviewCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewCommentQuery, ReviewCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewCommentQuery, ReviewCommentQueryVariables>(ReviewCommentDocument, options);
        }
export type ReviewCommentQueryHookResult = ReturnType<typeof useReviewCommentQuery>;
export type ReviewCommentLazyQueryHookResult = ReturnType<typeof useReviewCommentLazyQuery>;
export type ReviewCommentQueryResult = Apollo.QueryResult<ReviewCommentQuery, ReviewCommentQueryVariables>;
export const ReviewCommentsDocument = gql`
    query ReviewComments($limit: Int!, $cursor: String, $reviewId: Int!) {
  reviewComments(limit: $limit, cursor: $cursor, reviewId: $reviewId) {
    hasMore
    reviewComments {
      ...ReviewCommentSnippet
    }
  }
}
    ${ReviewCommentSnippetFragmentDoc}`;

/**
 * __useReviewCommentsQuery__
 *
 * To run a query within a React component, call `useReviewCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewCommentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useReviewCommentsQuery(baseOptions: Apollo.QueryHookOptions<ReviewCommentsQuery, ReviewCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewCommentsQuery, ReviewCommentsQueryVariables>(ReviewCommentsDocument, options);
      }
export function useReviewCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewCommentsQuery, ReviewCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewCommentsQuery, ReviewCommentsQueryVariables>(ReviewCommentsDocument, options);
        }
export type ReviewCommentsQueryHookResult = ReturnType<typeof useReviewCommentsQuery>;
export type ReviewCommentsLazyQueryHookResult = ReturnType<typeof useReviewCommentsLazyQuery>;
export type ReviewCommentsQueryResult = Apollo.QueryResult<ReviewCommentsQuery, ReviewCommentsQueryVariables>;
export const ReviewsDocument = gql`
    query Reviews($limit: Int!, $cursor: String, $text: String, $movieId: Int, $orderBy: String, $orderDir: String, $username: String) {
  reviews(
    limit: $limit
    cursor: $cursor
    text: $text
    movieId: $movieId
    orderBy: $orderBy
    orderDir: $orderDir
    username: $username
  ) {
    hasMore
    reviews {
      ...ReviewSnippet
    }
  }
}
    ${ReviewSnippetFragmentDoc}`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      text: // value for 'text'
 *      movieId: // value for 'movieId'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useReviewsQuery(baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;
export const FollowersDocument = gql`
    query Followers($userId: Int!, $limit: Int!, $cursor: String, $orderBy: String, $orderDir: String) {
  followers(
    userId: $userId
    limit: $limit
    cursor: $cursor
    orderBy: $orderBy
    orderDir: $orderDir
  ) {
    subscription {
      follower {
        id
        username
        avatar
        displayName
      }
    }
    hasMore
  }
}
    `;

/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *   },
 * });
 */
export function useFollowersQuery(baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
      }
export function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
export const FollowingsDocument = gql`
    query Followings($userId: Int!, $limit: Int!, $cursor: String, $orderBy: String, $orderDir: String) {
  followings(
    userId: $userId
    limit: $limit
    cursor: $cursor
    orderBy: $orderBy
    orderDir: $orderDir
  ) {
    subscription {
      following {
        id
        username
        avatar
        displayName
      }
    }
    hasMore
  }
}
    `;

/**
 * __useFollowingsQuery__
 *
 * To run a query within a React component, call `useFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *   },
 * });
 */
export function useFollowingsQuery(baseOptions: Apollo.QueryHookOptions<FollowingsQuery, FollowingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowingsQuery, FollowingsQueryVariables>(FollowingsDocument, options);
      }
export function useFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingsQuery, FollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowingsQuery, FollowingsQueryVariables>(FollowingsDocument, options);
        }
export type FollowingsQueryHookResult = ReturnType<typeof useFollowingsQuery>;
export type FollowingsLazyQueryHookResult = ReturnType<typeof useFollowingsLazyQuery>;
export type FollowingsQueryResult = Apollo.QueryResult<FollowingsQuery, FollowingsQueryVariables>;
export const CheckIfUsernameTakenDocument = gql`
    query CheckIfUsernameTaken($username: String!) {
  checkIfUsernameTaken(username: $username)
}
    `;

/**
 * __useCheckIfUsernameTakenQuery__
 *
 * To run a query within a React component, call `useCheckIfUsernameTakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfUsernameTakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfUsernameTakenQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckIfUsernameTakenQuery(baseOptions: Apollo.QueryHookOptions<CheckIfUsernameTakenQuery, CheckIfUsernameTakenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfUsernameTakenQuery, CheckIfUsernameTakenQueryVariables>(CheckIfUsernameTakenDocument, options);
      }
export function useCheckIfUsernameTakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfUsernameTakenQuery, CheckIfUsernameTakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfUsernameTakenQuery, CheckIfUsernameTakenQueryVariables>(CheckIfUsernameTakenDocument, options);
        }
export type CheckIfUsernameTakenQueryHookResult = ReturnType<typeof useCheckIfUsernameTakenQuery>;
export type CheckIfUsernameTakenLazyQueryHookResult = ReturnType<typeof useCheckIfUsernameTakenLazyQuery>;
export type CheckIfUsernameTakenQueryResult = Apollo.QueryResult<CheckIfUsernameTakenQuery, CheckIfUsernameTakenQueryVariables>;
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String!) {
  getUserByUsername(username: $username) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByUsernameQuery(baseOptions: Apollo.QueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
      }
export function useGetUserByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, options);
        }
export type GetUserByUsernameQueryHookResult = ReturnType<typeof useGetUserByUsernameQuery>;
export type GetUserByUsernameLazyQueryHookResult = ReturnType<typeof useGetUserByUsernameLazyQuery>;
export type GetUserByUsernameQueryResult = Apollo.QueryResult<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NumberOfWatchedByYearDocument = gql`
    query NumberOfWatchedByYear($year: String!) {
  numberOfWatchedByYear(year: $year)
}
    `;

/**
 * __useNumberOfWatchedByYearQuery__
 *
 * To run a query within a React component, call `useNumberOfWatchedByYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfWatchedByYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfWatchedByYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useNumberOfWatchedByYearQuery(baseOptions: Apollo.QueryHookOptions<NumberOfWatchedByYearQuery, NumberOfWatchedByYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfWatchedByYearQuery, NumberOfWatchedByYearQueryVariables>(NumberOfWatchedByYearDocument, options);
      }
export function useNumberOfWatchedByYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfWatchedByYearQuery, NumberOfWatchedByYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfWatchedByYearQuery, NumberOfWatchedByYearQueryVariables>(NumberOfWatchedByYearDocument, options);
        }
export type NumberOfWatchedByYearQueryHookResult = ReturnType<typeof useNumberOfWatchedByYearQuery>;
export type NumberOfWatchedByYearLazyQueryHookResult = ReturnType<typeof useNumberOfWatchedByYearLazyQuery>;
export type NumberOfWatchedByYearQueryResult = Apollo.QueryResult<NumberOfWatchedByYearQuery, NumberOfWatchedByYearQueryVariables>;
export const WatchedDocument = gql`
    query Watched($limit: Int, $cursor: String, $orderBy: String, $orderDir: String, $username: String!) {
  watched(
    limit: $limit
    cursor: $cursor
    orderBy: $orderBy
    orderDir: $orderDir
    username: $username
  ) {
    watched {
      id
      filmId
      creatorId
      filmTitle
      posterPath
      createdAt
      updatedAt
      ratingGiven
      creator {
        id
        username
        displayName
        avatar
      }
    }
    hasMore
  }
}
    `;

/**
 * __useWatchedQuery__
 *
 * To run a query within a React component, call `useWatchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useWatchedQuery(baseOptions: Apollo.QueryHookOptions<WatchedQuery, WatchedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WatchedQuery, WatchedQueryVariables>(WatchedDocument, options);
      }
export function useWatchedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WatchedQuery, WatchedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WatchedQuery, WatchedQueryVariables>(WatchedDocument, options);
        }
export type WatchedQueryHookResult = ReturnType<typeof useWatchedQuery>;
export type WatchedLazyQueryHookResult = ReturnType<typeof useWatchedLazyQuery>;
export type WatchedQueryResult = Apollo.QueryResult<WatchedQuery, WatchedQueryVariables>;
export const WatchlistDocument = gql`
    query Watchlist($limit: Int, $cursor: String, $orderBy: String, $orderDir: String, $username: String!) {
  watchlist(
    limit: $limit
    cursor: $cursor
    orderBy: $orderBy
    orderDir: $orderDir
    username: $username
  ) {
    watchlist {
      id
      filmId
      creatorId
      filmTitle
      posterPath
      createdAt
      updatedAt
      creator {
        id
        username
        displayName
        avatar
      }
    }
    hasMore
  }
}
    `;

/**
 * __useWatchlistQuery__
 *
 * To run a query within a React component, call `useWatchlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchlistQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      orderDir: // value for 'orderDir'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useWatchlistQuery(baseOptions: Apollo.QueryHookOptions<WatchlistQuery, WatchlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WatchlistQuery, WatchlistQueryVariables>(WatchlistDocument, options);
      }
export function useWatchlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WatchlistQuery, WatchlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WatchlistQuery, WatchlistQueryVariables>(WatchlistDocument, options);
        }
export type WatchlistQueryHookResult = ReturnType<typeof useWatchlistQuery>;
export type WatchlistLazyQueryHookResult = ReturnType<typeof useWatchlistLazyQuery>;
export type WatchlistQueryResult = Apollo.QueryResult<WatchlistQuery, WatchlistQueryVariables>;