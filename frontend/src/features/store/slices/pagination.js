import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },

    resetPage: (state) => {
      state.page = 1;
    },
  },
});

export const { changePage, resetPage } = paginationSlice.actions;

export default paginationSlice.reducer;
