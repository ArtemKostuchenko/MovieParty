import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: ({ page = 1, limit = 8 } = {}) => {
        return { url: `auth/me/favorites?page=${page}&limit=${limit}` };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["favorites"],
    }),

    getFavoriteByVideoContentId: builder.query({
      query: (videoContentId) => {
        return { url: `auth/me/favorites/${videoContentId}` };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["favorites"],
    }),

    addFavorite: builder.mutation({
      query: (videoContentId) => {
        return {
          url: "auth/me/favorites",
          method: "POST",
          data: { contentId: videoContentId },
        };
      },
      transformResponse: (resp) => resp.data,
      invalidatesTags: ["favorites"],
    }),

    removeFavorite: builder.mutation({
      query: (videoContentId) => {
        return {
          url: `auth/me/favorites/${videoContentId}`,
          method: "DELETE",
        };
      },
      transformResponse: (resp) => resp.data,
      invalidatesTags: ["favorites"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useGetFavoriteByVideoContentIdQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesApi;
