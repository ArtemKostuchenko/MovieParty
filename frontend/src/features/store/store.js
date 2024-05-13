import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contentApi, countriesApi } from "../services";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    [contentApi.reducerPath]: contentApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(contentApi.middleware)
      .concat(countriesApi.middleware),
});

setupListeners(store.dispatch);

export default store;
