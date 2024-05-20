import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { formatDate, getFormateSort } from "../../utils/functions";

export const directorsApi = createApi({
  reducerPath: "directorsApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["directors"],
  endpoints: (builder) => ({
    getDirectors: builder.query({
      query: ({ fullName, page, limit, sortName, sortType }) => ({
        url: `directors?fullName=${fullName}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
      transformResponse: (resp) => resp.data,
      providesTags: ["directors"],
    }),

    getDirectorById: builder.query({
      query: (id) => ({ url: `directors/${id}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["directors"],
    }),

    getDirectorByFullName: builder.query({
      query: (fullName) => ({ url: `directors/fullName/${fullName}` }),
      transformResponse: (resp) => resp.data,
      providesTags: ["directors"],
    }),

    addDirector: builder.mutation({
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
        if (dateDeath && dateDeath !== "NaN-NaN-NaN") {
          bodyData.append("dateDeath", formatDate(dateDeath, "hyphen"));
        }
        bodyData.append("sex", sex);
        bodyData.append("placeBirth", placeBirth);
        bodyData.append("photoURL", photoURL[0]);

        return {
          url: "directors",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["directors"],
    }),

    updateDirector: builder.mutation({
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
        if (dateDeath && dateDeath !== "NaN-NaN-NaN") {
          console.log(dateDeath);
          bodyData.append("dateDeath", formatDate(dateDeath, "hyphen"));
        }
        bodyData.append("sex", sex);
        bodyData.append("placeBirth", placeBirth);
        bodyData.append("photoURL", photoURL[0]);

        return {
          url: `directors/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["directors"],
    }),

    removeDirector: builder.mutation({
      query: (id) => ({
        url: `directors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["directors"],
    }),
  }),
});

export const {
  useGetDirectorsQuery,
  useGetDirectorByIdQuery,
  useGetDirectorByFullNameQuery,
  useAddDirectorMutation,
  useUpdateDirectorMutation,
  useRemoveDirectorMutation,
} = directorsApi;
