import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "countries",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
