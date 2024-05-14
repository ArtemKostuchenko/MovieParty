import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import country from "./slices/country";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contentApi, countriesApi } from "../services";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    country: country,
    [contentApi.reducerPath]: contentApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(contentApi.middleware)
      .concat(countriesApi.middleware),
});

setupListeners(store.dispatch);

export default store;
