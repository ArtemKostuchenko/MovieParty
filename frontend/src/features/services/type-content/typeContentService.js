import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { getFormateSort } from "../../utils/functions";

export const typesContentApi = createApi({
  reducerPath: "typesContentApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["typesContent"],
  endpoints: (builder) => ({
    getTypesContent: builder.query({
      query: ({ name, page, limit, sortName, sortType }) => ({
        url: `content/type?name=${name}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["typesContent"],
    }),
    addTypeContent: builder.mutation({
      query: ({ name, path, isSeries }) => {
        return {
          url: "content/type",
          method: "POST",
          data: { name, path, isSeries },
        };
      },
      invalidatesTags: ["typesContent"],
    }),
  }),
});

export const { useGetTypesContentQuery, useAddTypeContentMutation } =
  typesContentApi;
