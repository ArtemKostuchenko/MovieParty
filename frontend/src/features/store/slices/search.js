import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const visibleSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setVisibleState: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setVisibleState } = visibleSlice.actions;

export default visibleSlice.reducer;
