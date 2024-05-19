import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { getFormateSort } from "../../utils/functions";

export const selectionsApi = createApi({
  reducerPath: "selectionsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["selections"],
  endpoints: (builder) => ({
    getSelections: builder.query({
      query: ({ name, page, limit, sortName, sortType }) => ({
        url: `selections?name=${name}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["selections"],
    }),

    getSelectionById: builder.query({
      query: (id) => ({ url: `selections/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["selections"],
    }),

    addSelection: builder.mutation({
      query: ({ name, description }) => {
        return {
          url: "selections",
          method: "POST",
          data: { name, description },
        };
      },
      invalidatesTags: ["selections"],
    }),

    updateSelection: builder.mutation({
      query: ({ id, name, description }) => {
        return {
          url: `selections/${id}`,
          method: "PATCH",
          data: { name, description },
        };
      },
      invalidatesTags: ["selections"],
    }),

    removeSelection: builder.mutation({
      query: (id) => ({
        url: `selections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["selections"],
    }),
  }),
});

export const {
  useGetSelectionsQuery,
  useGetSelectionByIdQuery,
  useAddSelectionMutation,
  useUpdateSelectionMutation,
  useRemoveSelectionMutation,
} = selectionsApi;
