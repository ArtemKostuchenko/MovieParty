import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  sortName: "createdAt",
  sortType: "asc",
  isAddTypeContent: false,
  editId: null,
  removeId: null,
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

    handleAddTypeContent: (state) => {
      state.isAddTypeContent = true;
    },

    removeTypeContent: (state, action) => {
      state.removeId = action.payload;
    },

    resetTypeContent: (state) => {
      state.isAddTypeContent = false;
      state.editId = null;
      state.removeId = null;
    },
  },
});

export const {
  changePage,
  resetPage,
  changeSort,
  handleAddTypeContent,
  removeTypeContent,
  resetTypeContent,
} = typeContentSlice.actions;

export default typeContentSlice.reducer;
