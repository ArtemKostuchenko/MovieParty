import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { getFormateSort } from "../../utils/functions";

export const bestListsApi = createApi({
  reducerPath: "bestListsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["bestLists"],
  endpoints: (builder) => ({
    getBestLists: builder.query({
      query: ({ name, page, limit, sortName, sortType }) => ({
        url: `lists?name=${name}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["bestLists"],
    }),

    getBestListById: builder.query({
      query: (id) => ({ url: `lists/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["bestLists"],
    }),

    addBestList: builder.mutation({
      query: ({ name }) => {
        return {
          url: "lists",
          method: "POST",
          data: { name },
        };
      },
      invalidatesTags: ["bestLists"],
    }),

    updateBestList: builder.mutation({
      query: ({ id, name }) => {
        return {
          url: `lists/${id}`,
          method: "PATCH",
          data: { name },
        };
      },
      invalidatesTags: ["bestLists"],
    }),

    removeBestList: builder.mutation({
      query: (id) => ({
        url: `lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bestLists"],
    }),
  }),
});

export const {
  useGetBestListsQuery,
  useGetBestListByIdQuery,
  useAddBestListMutation,
  useUpdateBestListMutation,
  useRemoveBestListMutation,
} = bestListsApi;
