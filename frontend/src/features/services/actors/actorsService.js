import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { formatDate, getFormateSort } from "../../utils/functions";

export const actorsApi = createApi({
  reducerPath: "actorsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["actors"],
  endpoints: (builder) => ({
    getActors: builder.query({
      query: ({ fullName, page, limit, sortName, sortType }) => ({
        url: `actors?fullName=${fullName}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["actors"],
    }),

    getActorById: builder.query({
      query: (id) => ({ url: `actors/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["actors"],
    }),

    getActorByFullName: builder.query({
      query: (fullName) => ({ url: `actors/fullName/${fullName}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["actors"],
    }),

    addActor: builder.mutation({
      query: ({
        firstName,
        lastName,
        firstNameEng,
        lastNameEng,
        dateBirth,
        dateDeath,
        sex,
        placeBirth,
        photoURL,
      }) => {
        const bodyData = new FormData();
        bodyData.append("firstName", firstName);
        bodyData.append("lastName", lastName);
        bodyData.append("firstNameEng", firstNameEng);
        bodyData.append("lastNameEng", lastNameEng);
        bodyData.append("dateBirth", formatDate(dateBirth, "hyphen"));
        bodyData.append("dateDeath", formatDate(dateDeath, "hyphen"));
        bodyData.append("sex", sex);
        bodyData.append("placeBirth", placeBirth);
        bodyData.append("photoURL", photoURL[0]);

        return {
          url: "actors",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["actors"],
    }),

    updateActor: builder.mutation({
      query: ({
        id,
        firstName,
        lastName,
        firstNameEng,
        lastNameEng,
        dateBirth,
        dateDeath,
        sex,
        placeBirth,
        photoURL,
      }) => {
        const bodyData = new FormData();
        bodyData.append("firstName", firstName);
        bodyData.append("lastName", lastName);
        bodyData.append("firstNameEng", firstNameEng);
        bodyData.append("lastNameEng", lastNameEng);
        bodyData.append("dateBirth", formatDate(dateBirth, "hyphen"));
        bodyData.append("dateDeath", formatDate(dateDeath, "hyphen"));
        bodyData.append("sex", sex);
        bodyData.append("placeBirth", placeBirth);
        bodyData.append("photoURL", photoURL[0]);

        return {
          url: `actors/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["actors"],
    }),

    removeActor: builder.mutation({
      query: (id) => ({
        url: `actors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["actors"],
    }),
  }),
});

export const {
  useGetActorsQuery,
  useGetActorByIdQuery,
  useGetActorByFullNameQuery,
  useAddActorMutation,
  useUpdateActorMutation,
  useRemoveActorMutation,
} = actorsApi;
