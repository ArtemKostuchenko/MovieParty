import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  isAddCountry: false,
  editId: null,
  removeId: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    handleAddCountry: (state) => {
      state.isAddCountry = true;
    },

    editCountry: (state, action) => {
      state.editId = action.payload;
    },

    removeCountry: (state, action) => {
      state.removeId = action.payload;
    },

    resetCountry: (state) => {
      state.isAddCountry = false;
      state.editId = null;
      state.removeId = null;
    },

    changePage: (state, action) => {
      state.page = action.payload;
    },

    resetPage: (state) => {
      state.page = 1;
    },
  },
});

export const {
  handleAddCountry,
  editCountry,
  removeCountry,
  resetCountry,
  changePage,
  resetPage,
} = countrySlice.actions;

export default countrySlice.reducer;
