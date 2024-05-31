import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayingState: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setPlayingState } = playerSlice.actions;

export default playerSlice.reducer;
