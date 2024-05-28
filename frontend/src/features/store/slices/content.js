import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeVideoContent: "all",
  selectedSort: "new",
  sortName: "createdAt",
  sortType: "desc",
  selectedGenres: "",
  selectedYears: "",
};

const contentSlice = createSlice({
  name: "contentSlice",
  initialState,
  reducers: {
    setSelectedTypeVideoContent: (state, action) => {
      state.typeVideoContent = action.payload;
    },
    setSelectedSort: (state, action) => {
      const item = action.payload;
      switch (item) {
        case "new":
          state.selectedSort = "new";
          (state.sortName = "createdAt"), (state.sortType = "desc");
          break;
        case "watch":
          state.selectedSort = "watch";
          (state.sortName = "views"), (state.sortType = "desc");
          break;
        case "rating":
          state.selectedSort = "rating";
          (state.sortName = "rating"), (state.sortType = "desc");
          break;
        default:
          state.selectedSort = "new";
          (state.sortName = "createdAt"), (state.sortType = "desc");
      }
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setSelectedYears: (state, action) => {
      state.selectedYears = action.payload;
    },

    clearContent: (state) => {
      state.typeVideoContent = "all";
      state.selectedSort = "new";
      state.sortName = "createdAt";
      state.sortType = "desc";
      state.selectedGenres = "";
      state.selectedYears = "";
    },
  },
});

export const {
  setSelectedTypeVideoContent,
  setSelectedSort,
  setSelectedGenres,
  setSelectedYears,
  clearContent,
} = contentSlice.actions;

export default contentSlice.reducer;
