import { createApi } from "@reduxjs/toolkit/query";
import axiosBaseQuery from "../../fetch/axiosBaseQuery";

export const typeContentApi = createApi({
  reducerPath: "typeContentApi",
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["typeContent"],

  endpoints: (builder) => ({
    getTypesContent: builder.query({
      query: ({ name, page, limit, sortName, sortType }) => ({
        url: `content/types?name=${name}&page=${page}&limit=${limit}${getFormateSort(
          sortName,
          sortType
        )}`,
      }),
    }),
  }),
});

export const { useGetTypesContentQuery } = typeContentApi;
