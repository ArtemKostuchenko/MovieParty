import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  volume: 0.5,
  muted: false,
  isEnablePIP: false,
  isFullScreen: false,
  isSettingsOpen: false,
  speed: 1,
  m3u8URL: null,
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
    setMuteState: (state, action) => {
      state.muted = action.payload;
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
    setM3U8State: (state, action) => {
      state.m3u8URL = action.payload;
    },
  },
});

export const {
  setPlayingState,
  setVolumeState,
  setMuteState,
  setEnablePIPState,
  setFullScreenState,
  setSettingState,
  setSpeedState,
  setM3U8State,
} = playerSlice.actions;

export default playerSlice.reducer;
