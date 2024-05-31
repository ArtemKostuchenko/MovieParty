import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  volume: 0.5,
  isEnablePIP: false,
  isFullScreen: false,
  isSettingsOpen: false,
  speed: 1,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayingState: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolumeState: (state, action) => {
      state.volume = action.payload;
    },
    setEnablePIPState: (state, action) => {
      state.isEnablePIP = action.payload;
    },
    setFullScreenState: (state, action) => {
      state.isFullScreen = action.payload;
    },
    setSettingState: (state, action) => {
      state.isSettingsOpen = action.payload;
    },
    setSpeedState: (state, action) => {
      state.speed = action.payload;
    },
  },
});

export const {
  setPlayingState,
  setVolumeState,
  setEnablePIPState,
  setFullScreenState,
  setSettingState,
  setSpeedState,
} = playerSlice.actions;

export default playerSlice.reducer;
