import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => {
        return {
          url: `/auth/me`,
        };
      },
      transformResponse: (resp) => resp.user,
      providesTags: ["users"],
    }),
    getMyReviews: builder.query({
      query: (userId) => {
        return {
          url: `auth/me/reviews`,
        };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["users"],
    }),
  }),
});

export const { useGetMyInfoQuery, useGetMyReviewsQuery } = usersApi;
