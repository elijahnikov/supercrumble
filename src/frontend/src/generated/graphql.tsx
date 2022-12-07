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

export type BatchedListResponse = {
  __typename?: 'BatchedListResponse';
  filmList?: Maybe<FilmList>;
  filmListEntries: Array<FilmListEntries>;
  hasMore: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FilmInput = {
  backdropPath: Scalars['String'];
  movieId: Scalars['Float'];
  movieTitle: Scalars['String'];
  overview: Scalars['String'];
  posterPath: Scalars['String'];
  releaseDate: Scalars['String'];
};

export type FilmList = {
  __typename?: 'FilmList';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  tags: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FilmListEntries = {
  __typename?: 'FilmListEntries';
  createdAt: Scalars['String'];
  film: Films;
  filmId: Scalars['Float'];
  id: Scalars['Float'];
  listId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type FilmListEntriesInput = {
  filmId: Scalars['Float'];
  listId: Scalars['Float'];
};

export type FilmListInput = {
  description: Scalars['String'];
  tags: Scalars['String'];
  title: Scalars['String'];
};

export type FilmListResponse = {
  __typename?: 'FilmListResponse';
  filmList?: Maybe<FilmList>;
};

export type FilmTags = {
  __typename?: 'FilmTags';
  count?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Films = {
  __typename?: 'Films';
  backdropPath: Scalars['String'];
  createdAt: Scalars['String'];
  likeCount: Scalars['Float'];
  listCount: Scalars['Float'];
  movieId: Scalars['Float'];
  movieTitle: Scalars['String'];
  overview: Scalars['String'];
  posterPath: Scalars['String'];
  releaseDate: Scalars['String'];
  updatedAt: Scalars['String'];
  watchCount: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUsername?: Maybe<UserResponse>;
  createEntries?: Maybe<Scalars['Boolean']>;
  createFilm?: Maybe<Scalars['Boolean']>;
  createFilmList: FilmListResponse;
  createReview: Review;
  createReviewComment: ReviewComment;
  deleteReview: Scalars['Boolean'];
  deleteReviewComment: Scalars['Boolean'];
  editUserDetails: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  reviewCommentVote: Scalars['Boolean'];
  settingsChangePassword: UserResponse;
  signS3: S3Payload;
  updateReview?: Maybe<Review>;
  updateReviewComment?: Maybe<ReviewComment>;
  vote: Scalars['Boolean'];
};


export type MutationChangeUsernameArgs = {
  input: NewUsernameInput;
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


export type MutationCreateReviewArgs = {
  input: ReviewInput;
};


export type MutationCreateReviewCommentArgs = {
  input: ReviewCommentInput;
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


export type MutationSettingsChangePasswordArgs = {
  currentPassword: Scalars['String'];
  settingsNewPassword: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignS3Args = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
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

export type PaginatedFilmListEntries = {
  __typename?: 'PaginatedFilmListEntries';
  filmListEntries: Array<FilmListEntries>;
  hasMore: Scalars['Boolean'];
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

export type Query = {
  __typename?: 'Query';
  film?: Maybe<Films>;
  filmList?: Maybe<BatchedListResponse>;
  filmListEntries: PaginatedFilmListEntries;
  getUser?: Maybe<User>;
  getUserByUsername?: Maybe<User>;
  me?: Maybe<User>;
  review?: Maybe<Review>;
  reviewComment?: Maybe<ReviewComment>;
  reviewComments: PaginatedReviewComments;
  reviews: PaginatedReviews;
  tags?: Maybe<FilmTags>;
};


export type QueryFilmArgs = {
  movieId: Scalars['Int'];
};


export type QueryFilmListArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFilmListEntriesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  listId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByUsernameArgs = {
  username: Scalars['String'];
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
};


export type QueryTagsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
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
};

export type S3Payload = {
  __typename?: 'S3Payload';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  bioLink?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Float'];
  onboarded?: Maybe<Scalars['Boolean']>;
  totalFilmsWatched?: Maybe<Scalars['Float']>;
  totalHoursWatched?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  usernameChangeDate?: Maybe<Scalars['String']>;
};

export type UserDetailsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  bioLink?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  onboarded?: InputMaybe<Scalars['Boolean']>;
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

export type ErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type ReviewCommentSnippetFragment = { __typename?: 'ReviewComment', id: number, parentId?: number | null, creatorId: number, reviewId: number, text: string, score: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } };

export type ReviewSnippetFragment = { __typename?: 'Review', id: number, referenceId: string, movieId: number, text: string, movie_poster: string, backdrop: string, movie_title: string, movie_release_year: number, ratingGiven: number, score: number, containsSpoilers: boolean, tags: string, createdAt: string, updatedAt: string, voteStatus?: number | null, noOfComments: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } };

export type UserFragmentFragment = { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null };

export type UserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null };

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

export type CreateFilmMutationVariables = Exact<{
  input: Array<FilmInput> | FilmInput;
}>;


export type CreateFilmMutation = { __typename?: 'Mutation', createFilm?: boolean | null };

export type FilmQueryVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type FilmQuery = { __typename?: 'Query', film?: { __typename?: 'Films', movieId: number, movieTitle: string, overview: string, posterPath: string, backdropPath: string, releaseDate: string, watchCount: number, listCount: number, likeCount: number, createdAt: string, updatedAt: string } | null };

export type CreateFilmListMutationVariables = Exact<{
  input: FilmListInput;
  filmIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreateFilmListMutation = { __typename?: 'Mutation', createFilmList: { __typename?: 'FilmListResponse', filmList?: { __typename?: 'FilmList', id: number, title: string, description?: string | null, tags: string, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null } };

export type CreateReviewMutationVariables = Exact<{
  input: ReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: number, createdAt: string, updatedAt: string, text: string, score: number, creatorId: number, referenceId: string } };

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

export type EditUserDetailsMutationVariables = Exact<{
  input: UserDetailsInput;
}>;


export type EditUserDetailsMutation = { __typename?: 'Mutation', editUserDetails: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type SettingsChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  settingsNewPassword: Scalars['String'];
  username: Scalars['String'];
}>;


export type SettingsChangePasswordMutation = { __typename?: 'Mutation', settingsChangePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null } };

export type FilmListQueryVariables = Exact<{
  id: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FilmListQuery = { __typename?: 'Query', filmList?: { __typename?: 'BatchedListResponse', hasMore: boolean, filmList?: { __typename?: 'FilmList', id: number, title: string, description?: string | null, tags: string, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null, filmListEntries: Array<{ __typename?: 'FilmListEntries', id: number, filmId: number, listId: number, createdAt: string, updatedAt: string, film: { __typename?: 'Films', movieId: number, movieTitle: string, overview: string, posterPath: string, backdropPath: string, releaseDate: string, watchCount: number, likeCount: number, listCount: number } }> } | null };

export type ReviewQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReviewQuery = { __typename?: 'Query', review?: { __typename?: 'Review', id: number, referenceId: string, movieId: number, text: string, movie_poster: string, backdrop: string, movie_title: string, movie_release_year: number, ratingGiven: number, score: number, containsSpoilers: boolean, tags: string, createdAt: string, updatedAt: string, voteStatus?: number | null, noOfComments: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } } | null };

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
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: { __typename?: 'PaginatedReviews', hasMore: boolean, reviews: Array<{ __typename?: 'Review', id: number, referenceId: string, movieId: number, text: string, movie_poster: string, backdrop: string, movie_title: string, movie_release_year: number, ratingGiven: number, score: number, containsSpoilers: boolean, tags: string, createdAt: string, updatedAt: string, voteStatus?: number | null, noOfComments: number, creator: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', getUserByUsername?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, bio?: string | null, bioLink?: string | null, totalFilmsWatched?: number | null, totalHoursWatched?: number | null, createdAt: string, updatedAt: string, usernameChangeDate?: string | null, onboarded?: boolean | null } | null };

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
  username
  displayName
  email
  avatar
  bio
  bioLink
  totalFilmsWatched
  totalHoursWatched
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
export const CreateReviewDocument = gql`
    mutation CreateReview($input: ReviewInput!) {
  createReview(input: $input) {
    id
    createdAt
    updatedAt
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
export const SettingsChangePasswordDocument = gql`
    mutation SettingsChangePassword($currentPassword: String!, $settingsNewPassword: String!, $username: String!) {
  settingsChangePassword(
    currentPassword: $currentPassword
    settingsNewPassword: $settingsNewPassword
    username: $username
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
 *      username: // value for 'username'
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
export const FilmListDocument = gql`
    query FilmList($id: Int!, $cursor: String, $limit: Int) {
  filmList(id: $id, cursor: $cursor, limit: $limit) {
    filmList {
      id
      title
      description
      tags
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
    query Reviews($limit: Int!, $cursor: String, $text: String, $movieId: Int, $orderBy: String, $orderDir: String) {
  reviews(
    limit: $limit
    cursor: $cursor
    text: $text
    movieId: $movieId
    orderBy: $orderBy
    orderDir: $orderDir
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