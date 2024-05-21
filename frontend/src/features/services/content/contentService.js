import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { formatDate, getFormateSort } from "../../utils/functions";

export const videoContentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["video-content"],
  endpoints: (builder) => ({
    getVideoContent: builder.query({
      query: ({ title, page, limit, sortName, sortType }) => ({
        url: `content/v?fields=title,originTitle,previewURL,typeVideoContent&title=${title}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["video-content"],
    }),

    getVideoContentByOriginTitle: builder.query({
      query: (originTitle) => ({
        url: `content/v/originTitle/${originTitle}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["video-content"],
    }),

    getVideoContentById: builder.query({
      query: (id) => ({ url: `content/v/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["video-content"],
    }),

    addVideoContent: builder.mutation({
      query: (content) => {
        const {
          title,
          originTitle,
          typeVideoContent,
          IMDb,
          description,
          releaseDate,
          duration,
          previewURL,
          backgroundURL,
          trailerURL,
          originCountries,
          genres,
          actors,
          directors,
          lists,
          part,
          soundTracks,
          seasons,
        } = content;

        const bodyData = new FormData();
        bodyData.append("title", title);
        bodyData.append("originTitle", originTitle);
        bodyData.append("typeVideoContent", typeVideoContent);
        bodyData.append("IMDb", IMDb);
        bodyData.append("description", description);
        bodyData.append("releaseDate", formatDate(releaseDate, "hyphen"));
        bodyData.append("duration", duration);
        bodyData.append("previewURL", previewURL);
        bodyData.append("backgroundURL", backgroundURL);
        bodyData.append("trailerURL", trailerURL);
        bodyData.append("originCountries", originCountries);
        bodyData.append("genres", genres);
        bodyData.append("actors", actors);
        bodyData.append("directors", directors);
        bodyData.append("lists", lists);
        bodyData.append("part", part);
        bodyData.append("soundTracks", soundTracks);
        bodyData.append("seasons", seasons);

        return {
          url: "content/v",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["video-content"],
    }),

    updateVideoContent: builder.mutation({
      query: (content) => {
        const {
          title,
          originTitle,
          typeVideoContent,
          IMDb,
          description,
          releaseDate,
          duration,
          previewURL,
          backgroundURL,
          trailerURL,
          originCountries,
          genres,
          actors,
          directors,
          lists,
          part,
          soundTracks,
          seasons,
        } = content;

        const bodyData = new FormData();
        bodyData.append("title", title);
        bodyData.append("originTitle", originTitle);
        bodyData.append("typeVideoContent", typeVideoContent);
        bodyData.append("IMDb", IMDb);
        bodyData.append("description", description);
        bodyData.append("releaseDate", formatDate(releaseDate, "hyphen"));
        bodyData.append("duration", duration);
        bodyData.append("previewURL", previewURL);
        bodyData.append("backgroundURL", backgroundURL);
        bodyData.append("trailerURL", trailerURL);
        bodyData.append("originCountries", originCountries);
        bodyData.append("genres", genres);
        bodyData.append("actors", actors);
        bodyData.append("directors", directors);
        bodyData.append("lists", lists);
        bodyData.append("part", part);
        bodyData.append("soundTracks", soundTracks);
        bodyData.append("seasons", seasons);

        return {
          url: `content/v/${content.id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["video-content"],
    }),

    removeVideoContent: builder.mutation({
      query: (id) => ({
        url: `content/v/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video-content"],
    }),
  }),
});

export const {
  useGetVideoContentQuery,
  useGetVideoContentByIdQuery,
  useGetVideoContentByOriginTitleQuery,
  useAddVideoContentMutation,
  useUpdateVideoContentMutation,
  useRemoveVideoContentMutation,
} = videoContentApi;
