import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSideMenuState: (state, action) => {
      state.isSideMenuOpen = action.payload;
    },
  },
});

export const { setSideMenuState } = menuSlice.actions;

export default menuSlice.reducer;
