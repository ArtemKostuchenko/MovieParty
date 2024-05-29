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
      query: ({
        name = "",
        page,
        limit,
        sortName,
        sortType,
        reg = true,
      } = {}) => ({
        url: `content/type?name=${name}${page ? `&page=${page}` : ``}${
          limit ? `&limit=${limit}${getFormateSort(sortName, sortType)}` : ``
        }${reg ? `&reg=1` : ""}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["typesContent"],
    }),
    getTypeContentById: builder.query({
      query: (id) => ({ url: `content/type/${id}` }),
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
    removeTypeContent: builder.mutation({
      query: (id) => ({
        url: `content/type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["typesContent"],
    }),
    updateTypeContent: builder.mutation({
      query: ({ id, name, path, isSeries }) => {
        return {
          url: `content/type/${id}`,
          method: "PATCH",
          data: { name, path, isSeries },
        };
      },
      invalidatesTags: ["typesContent"],
    }),
  }),
});

export const {
  useGetTypesContentQuery,
  useGetTypeContentByIdQuery,
  useAddTypeContentMutation,
  useRemoveTypeContentMutation,
  useUpdateTypeContentMutation,
} = typesContentApi;
