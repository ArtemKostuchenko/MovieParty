import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: false,
  isProfileMenuOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSideMenuState: (state, action) => {
      state.isSideMenuOpen = action.payload;
    },
    setProfileMenuOpenState: (state, action) => {
      state.isProfileMenuOpen = action.payload;
    },
  },
});

export const { setSideMenuState, setProfileMenuOpenState } = menuSlice.actions;

export default menuSlice.reducer;
