import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  isAddGenre: false,
  editId: null,
  removeId: null,
  sortName: "createdAt",
  sortType: "asc",
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    handleAddGenre: (state) => {
      state.isAddGenre = true;
    },

    editGenre: (state, action) => {
      state.editId = action.payload;
    },

    removeGenre: (state, action) => {
      state.removeId = action.payload;
    },

    resetGenre: (state) => {
      state.isAddGenre = false;
      state.editId = null;
      state.removeId = null;
    },

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

export const {
  handleAddGenre,
  editGenre,
  removeGenre,
  resetGenre,
  changePage,
  resetPage,
  changeSort,
} = genreSlice.actions;

export default genreSlice.reducer;
