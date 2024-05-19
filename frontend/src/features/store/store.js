import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import pagination from "./slices/pagination";
import sort from "./slices/sort";
import popup from "./slices/popup";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  contentApi,
  countriesApi,
  typesContentApi,
  genresApi,
  bestListsApi,
} from "../services";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    pagination: pagination,
    sort: sort,
    popup: popup,
    [typesContentApi.reducerPath]: typesContentApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [bestListsApi.reducerPath]: bestListsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(contentApi.middleware)
      .concat(countriesApi.middleware)
      .concat(typesContentApi.middleware)
      .concat(genresApi.middleware)
      .concat(bestListsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
