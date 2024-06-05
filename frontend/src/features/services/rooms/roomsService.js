import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["rooms"],
  endpoints: (builder) => ({
    getRoomById: builder.query({
      query: (roomId) => {
        return {
          url: `rooms/${roomId}`,
        };
      },
      transformResponse: (resp) => resp.data,
      providesTags: ["rooms"],
    }),
    createRoom: builder.mutation({
      query: ({
        videoContentId,
        title,
        isPublic,
        password = "",
        maxNumberUsers,
        voiceChat,
      } = {}) => {
        return {
          url: `rooms`,
          method: "POST",
          data: {
            videoContentId,
            title,
            isPublic,
            password,
            maxNumberUsers,
            voiceChat,
          },
        };
      },
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const { useGetRoomByIdQuery, useCreateRoomMutation } = roomsApi;
