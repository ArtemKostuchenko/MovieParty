import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const typesContentApi = createApi({
  reducerPath: "typesContentApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["typesContent"],
  endpoints: (builder) => ({
    getTypesContent: builder.query({
      query: () => ({
        url: `content/type`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["typesContent"],
    }),
  }),
});

export const { useGetTypesContentQuery } = typesContentApi;
