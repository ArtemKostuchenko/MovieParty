import { configureStore } from "@reduxjs/toolkit";
import faq from "./slices/faq";
import user from "./slices/user";

const store = configureStore({
  reducer: {
    faq: faq,
    user: user,
  },
});

export default store;
