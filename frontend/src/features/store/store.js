import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import country from "./slices/country";
import typeContent from "./slices/type-content";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contentApi, countriesApi, typeContentApi } from "../services";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    country: country,
    typeContent: typeContent,
    [contentApi.reducerPath]: contentApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [typeContentApi.reducerPath]: typeContentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(contentApi.middleware)
      .concat(countriesApi.middleware)
      .concat(typeContentApi.middleware),
});

setupListeners(store.dispatch);

export default store;
