import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortName: "createdAt",
  sortType: "asc",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSort: (state, action) => {
      const { sortName, sortType } = action.payload;
      state.sortName = sortName;
      state.sortType = sortType;
    },
    resetSort: (state) => {
      state.sortName = "createdAt";
      state.sortType = "asc";
    },
  },
});

export const { changeSort, resetSort } = sortSlice.actions;

export default sortSlice.reducer;
