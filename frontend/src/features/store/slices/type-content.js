import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  sortName: "createdAt",
  sortType: "asc",
};

const typeContentSlice = createSlice({
  name: "typeContent",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },

    resetPage: (state) => {
      state.page = 1;
    },

    changeSort: (state, action) => {
      const { sortName, sortType } = action.payload;
      state.sortName = sortName;
      state.sortType = sortType;
    },
  },
});

export const { changePage, resetPage, changeSort } = typeContentSlice.actions;

export default typeContentSlice.reducer;
