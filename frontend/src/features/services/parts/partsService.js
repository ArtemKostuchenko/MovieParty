import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { getFormateSort } from "../../utils/functions";

export const partsApi = createApi({
  reducerPath: "partsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["parts"],
  endpoints: (builder) => ({
    getParts: builder.query({
      query: ({ name, page, limit, sortName, sortType }) => ({
        url: `parts?name=${name}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["parts"],
    }),

    getPartById: builder.query({
      query: (id) => ({ url: `parts/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["parts"],
    }),

    addPart: builder.mutation({
      query: ({ name }) => {
        return {
          url: "parts",
          method: "POST",
          data: { name },
        };
      },
      invalidatesTags: ["parts"],
    }),

    updatePart: builder.mutation({
      query: ({ id, name }) => {
        return {
          url: `parts/${id}`,
          method: "PATCH",
          data: { name },
        };
      },
      invalidatesTags: ["parts"],
    }),

    removePart: builder.mutation({
      query: (id) => ({
        url: `parts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["parts"],
    }),
  }),
});

export const {
  useGetPartsQuery,
  useGetPartByIdQuery,
  useAddPartMutation,
  useUpdatePartMutation,
  useRemovePartMutation,
} = partsApi;
