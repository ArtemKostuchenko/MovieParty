import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { getFormateSort } from "../../utils/functions";

export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["genres"],
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: ({
        name = "",
        page = 0,
        limit = 0,
        sortName = "",
        sortType = "",
        reg = true,
      } = {}) => ({
        url: `genres?name=${name}${page !== 0 ? `&page=${page}` : ""}${
          limit !== 0 ? `&limit=${limit}` : ""
        }${getFormateSort(sortName, sortType)}${reg ? `&reg=1` : ""}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["genres"],
    }),

    getGenreById: builder.query({
      query: (id) => ({ url: `genres/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["genres"],
    }),

    addGenre: builder.mutation({
      query: ({ name, originName }) => {
        return {
          url: "genres",
          method: "POST",
          data: { name, originName },
        };
      },
      invalidatesTags: ["genres"],
    }),

    updateGenre: builder.mutation({
      query: ({ id, name, originName }) => {
        return {
          url: `genres/${id}`,
          method: "PATCH",
          data: { name, originName },
        };
      },
      invalidatesTags: ["genres"],
    }),

    removeGenre: builder.mutation({
      query: (id) => ({
        url: `genres/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["genres"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetGenreByIdQuery,
  useAddGenreMutation,
  useUpdateGenreMutation,
  useRemoveGenreMutation,
} = genresApi;
