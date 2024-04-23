import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getVideoContent: builder.query({
      query: () => ({
        url: "content/v?fields=title,originTitle,previewURL,typeVideoContent",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVideoContentQuery } = contentApi;
