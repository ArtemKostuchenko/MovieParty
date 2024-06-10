import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const subscriptionsApi = createApi({
  reducerPath: "subscriptionsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["subscriptions"],
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: () => {
        return {
          url: "subscription",
          method: "POST",
        };
      },
      transformResponse: (resp) => resp.data,
      invalidatesTags: ["subscriptions"],
    }),
    getSubscription: builder.query({
      query: (subscription) => {
        return {
          url: `subscription/${subscription}`,
        };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["subscriptions"],
    }),
    cancelSubscription: builder.mutation({
      query: (subscription) => {
        return {
          url: `subscription/cancel`,
          method: "POST",
          data: {
            subscription,
          },
        };
      },
      transformResponse: (resp) => resp.data,
      invalidatesTags: ["subscriptions"],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
  useCancelSubscriptionMutation,
} = subscriptionsApi;
