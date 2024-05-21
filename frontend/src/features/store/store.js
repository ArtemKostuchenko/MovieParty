import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";
import pagination from "./slices/pagination";
import sort from "./slices/sort";
import popup from "./slices/popup";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  videoContentApi,
  countriesApi,
  typesContentApi,
  genresApi,
  bestListsApi,
  partsApi,
  selectionsApi,
  actorsApi,
  directorsApi,
} from "../services";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
    pagination: pagination,
    sort: sort,
    popup: popup,
    [typesContentApi.reducerPath]: typesContentApi.reducer,
    [videoContentApi.reducerPath]: videoContentApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [bestListsApi.reducerPath]: bestListsApi.reducer,
    [partsApi.reducerPath]: partsApi.reducer,
    [selectionsApi.reducerPath]: selectionsApi.reducer,
    [actorsApi.reducerPath]: actorsApi.reducer,
    [directorsApi.reducerPath]: directorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(videoContentApi.middleware)
      .concat(countriesApi.middleware)
      .concat(typesContentApi.middleware)
      .concat(genresApi.middleware)
      .concat(bestListsApi.middleware)
      .concat(partsApi.middleware)
      .concat(selectionsApi.middleware)
      .concat(actorsApi.middleware)
      .concat(directorsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
