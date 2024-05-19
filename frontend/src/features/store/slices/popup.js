import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdd: false,
  editId: null,
  removeId: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    handleAdd: (state) => {
      state.isAdd = true;
    },

    handleEdit: (state, action) => {
      state.editId = action.payload;
    },

    handleRemove: (state, action) => {
      state.removeId = action.payload;
    },

    handleReset: (state) => {
      state.isAdd = false;
      state.editId = null;
      state.removeId = null;
    },
  },
});

export const { handleAdd, handleEdit, handleRemove, handleReset } =
  popupSlice.actions;

export default popupSlice.reducer;
