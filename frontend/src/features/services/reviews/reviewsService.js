import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => {
        return {
          url: `reviews`,
        };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["reviews"],
    }),
    getReviewsByVideoContentId: builder.query({
      query: (videoContentId) => {
        return {
          url: `reviews/v/${videoContentId}`,
        };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["reviews"],
    }),
    addReview: builder.mutation({
      query: ({ videoContentId, message }) => {
        return {
          url: `reviews`,
          method: "POST",
          data: { contentId: videoContentId, message },
        };
      },
      invalidatesTags: ["reviews"],
    }),
    likeReview: builder.mutation({
      query: (reviewId) => {
        return {
          url: `reviews/like`,
          method: "POST",
          data: { reviewId },
        };
      },
      invalidatesTags: ["reviews"],
    }),
    dislikeReview: builder.mutation({
      query: (reviewId) => {
        return {
          url: `reviews/dislike`,
          method: "POST",
          data: { reviewId },
        };
      },
      invalidatesTags: ["reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ videoContentId, message }) => {
        return {
          url: `reviews`,
          method: "PATCH",
          data: { contentId: videoContentId, message },
        };
      },
      invalidatesTags: ["reviews"],
    }),
    removeReview: builder.mutation({
      query: (id) => {
        return {
          url: `reviews/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByVideoContentIdQuery,
  useAddReviewMutation,
  useLikeReviewMutation,
  useDislikeReviewMutation,
  useUpdateReviewMutation,
  useRemoveReviewMutation,
} = reviewsApi;
