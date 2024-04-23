import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contentApi } from "../services/content/contentService";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentApi.middleware),
});

setupListeners(store.dispatch);

export default store;
