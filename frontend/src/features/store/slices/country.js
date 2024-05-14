import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { handleAddCountry, editCountry, removeCountry, resetCountry } =
  countrySlice.actions;

export default countrySlice.reducer;
