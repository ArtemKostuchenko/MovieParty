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
      query: ({
        title = "",
        typeVideoContent = "",
        genre = "",
        genres = [],
        releaseYears = "",
        page = 0,
        limit = 0,
        fields = "",
        sortName = "",
        sortType = "",
      } = {}) => ({
        url: `content/v?${
          fields
            ? fields
            : "fields=title,originTitle,previewURL,typeVideoContent,createdAt"
        }${title ? `&title=${title}` : ``}${
          typeVideoContent !== "all" && typeVideoContent
            ? `&typeVideoContent=${typeVideoContent}`
            : ""
        }${genre ? `&genre=${genre}` : ""}${
          genres.length !== 0 ? `&genres=${genres.join(",")}` : ""
        }${page !== 0 ? `&page=${page}` : ``}${
          releaseYears ? `&releaseYears=${releaseYears}` : ""
        }${limit ? `&limit=${limit}` : ``}${getFormateSort(
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
          parts,
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
        bodyData.append("previewURL", previewURL[0]);
        bodyData.append("backgroundURL", backgroundURL[0]);
        bodyData.append("trailerURL", trailerURL);
        bodyData.append(
          "originCountries",
          JSON.stringify(originCountries.map((country) => country._id))
        );
        bodyData.append(
          "genres",
          JSON.stringify(genres.map((genre) => genre._id))
        );
        bodyData.append(
          "actors",
          JSON.stringify(actors.map((actor) => actor._id))
        );
        bodyData.append(
          "directors",
          JSON.stringify(directors.map((director) => director._id))
        );
        bodyData.append(
          "lists",
          JSON.stringify(
            lists.map((list) => ({
              idList: list._id,
              placeInList: list.placeInList,
            }))
          )
        );
        bodyData.append("part", parts?.[0]._id);
        bodyData.append("soundTracks", JSON.stringify(soundTracks));
        bodyData.append("seasons", JSON.stringify(seasons));

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
          parts,
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
        bodyData.append("previewURL", previewURL[0]);
        bodyData.append("backgroundURL", backgroundURL[0]);
        bodyData.append("trailerURL", trailerURL);
        bodyData.append(
          "originCountries",
          JSON.stringify(originCountries.map((country) => country._id))
        );
        bodyData.append(
          "genres",
          JSON.stringify(genres.map((genre) => genre._id))
        );
        bodyData.append(
          "actors",
          JSON.stringify(actors.map((actor) => actor._id))
        );
        bodyData.append(
          "directors",
          JSON.stringify(directors.map((director) => director._id))
        );
        bodyData.append(
          "lists",
          JSON.stringify(
            lists.map((list) => ({
              idList: list._id,
              placeInList: list.placeInList,
            }))
          )
        );
        bodyData.append("part", parts?.[0]._id);
        bodyData.append("soundTracks", JSON.stringify(soundTracks));
        bodyData.append("seasons", JSON.stringify(seasons));

        return {
          url: `content/v/${content.id}`,
          method: "PATCH",
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
