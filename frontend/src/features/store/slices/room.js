import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: true,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setChatState: (state, action) => {
      state.isChatOpen = action.payload;
    },
  },
});

export const { setChatState } = roomSlice.actions;

export default roomSlice.reducer;
