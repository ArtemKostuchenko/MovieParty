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
    getReviewsByOriginNameVideoContent: builder.query({
      query: (originName) => {
        return {
          url: `reviews/v/${originName}`,
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
  useGetReviewsByOriginNameVideoContentQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useRemoveReviewMutation,
} = reviewsApi;
