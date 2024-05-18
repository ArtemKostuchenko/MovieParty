import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import country from "./slices/country";
import typeContent from "./slices/type-content";
import genre from "./slices/genre";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  contentApi,
  countriesApi,
  typesContentApi,
  genresApi,
} from "../services";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    country: country,
    typeContent: typeContent,
    genre: genre,
    [typesContentApi.reducerPath]: typesContentApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(contentApi.middleware)
      .concat(countriesApi.middleware)
      .concat(typesContentApi.middleware)
      .concat(genresApi.middleware),
});

setupListeners(store.dispatch);

export default store;
