import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const ratingsApi = createApi({
  reducerPath: "ratingsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["ratings"],
  endpoints: (builder) => ({
    rateVideoContent: builder.mutation({
      query: (videoContentId) => {
        return {
          url: `content/v/rating`,
          method: "POST",
          data: { videoContentId },
        };
      },
      invalidatesTags: ["video-content"],
    }),
    getRateByVideoContentAndUserId: builder.query({
      query: (videoContentId) => {
        return {
          url: `content/v${videoContentId}/rating`,
        };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["ratings"],
    }),
  }),
});

export const {
  useRateVideoContentMutation,
  useGetRateByVideoContentAndUserIdQuery,
} = ratingsApi;
