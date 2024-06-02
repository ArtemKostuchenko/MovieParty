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
    updateMe: builder.mutation({
      query: ({
        nickname = "",
        email = "",
        avatarURL = "",
        sex = "",
        country = "",
      } = {}) => {
        const bodyData = new FormData();
        bodyData.append("nickname", nickname);
        bodyData.append("email", email);
        bodyData.append("avatarURL", avatarURL);
        bodyData.append("sex", sex);
        bodyData.append("country", country);

        return {
          url: `auth/me/update`,
          method: "PATCH",
          data: bodyData,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetMyInfoQuery, useGetMyReviewsQuery, useUpdateMeMutation } =
  usersApi;
