import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";
import { string } from "yup";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["countries"],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({ url: "countries" }),
      transformResponse: (resp) => resp.data,
      providesTags: ["countries"],
    }),
    getCountryById: builder.query({
      query: (id) => ({ url: `countries/${id}` }),
      transformResponse: (resp) => resp.data,
    }),
    addCountry: builder.mutation({
      query: ({ name, originName, icon }) => {
        const bodyData = new FormData();
        bodyData.append("name", name);
        bodyData.append("originName", originName);
        bodyData.append("icon", icon[0]);

        return {
          url: "countries",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyData,
        };
      },
      invalidatesTags: ["countries"],
    }),

    updateCountry: builder.mutation({
      query: ({ name, originName, icon }) => {
        if (typeof icon !== string) {
          const bodyData = new FormData();
          bodyData.append("name", name);
          bodyData.append("originName", originName);
          bodyData.append("icon", icon[0]);

          return {
            url: "countries",
            method: "PATCH",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: bodyData,
          };
        } else {
          return {
            url: "countries",
            method: "PATCH",
            data: { name, originName, icon },
          };
        }
      },
      invalidatesTags: ["countries"],
    }),

    removeCountry: builder.mutation({
      query: (id) => ({
        url: `countries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["countries"],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryByIdQuery,
  useAddCountryMutation,
  useRemoveCountryMutation,
} = countriesApi;
