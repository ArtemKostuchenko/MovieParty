import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";

const store = configureStore({
  reducer: {
    faq: faq,
  },
});

export default store;
