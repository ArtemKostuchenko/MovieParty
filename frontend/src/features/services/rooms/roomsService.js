import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const roomsApi = createApi({
  reducerPath: "reviewsApi",
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
    }),
    createRoom: builder.mutation({
      query: ({
        videoContentId,
        title,
        isPublic,
        maxNumberUsers,
        voiceChat,
      }) => {
        return {
          url: `rooms`,
          method: "POST",
          data: {
            videoContentId,
            title,
            isPublic,
            maxNumberUsers,
            voiceChat,
          },
        };
      },
    }),
  }),
});

export const { useGetRoomByIdQuery, useCreateRoomMutation } = roomsApi;
