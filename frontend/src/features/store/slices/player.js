import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  volume: 0.5,
  muted: false,
  speed: 1,
  time: 0,
  isEnablePIP: false,
  isFullScreen: false,
  isSettingsOpen: false,
  m3u8URL: null,
  season: 0,
  episode: 0,
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
    setTimeState: (state, action) => {
      state.time = action.payload;
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
    setSeasonState: (state, action) => {
      state.season = action.payload;
    },
    setEpisodeState: (state, action) => {
      state.episode = action.payload;
    },
  },
});

export const {
  setPlayingState,
  setVolumeState,
  setMuteState,
  setTimeState,
  setEnablePIPState,
  setFullScreenState,
  setSettingState,
  setSpeedState,
  setM3U8State,
  setSeasonState,
  setEpisodeState,
} = playerSlice.actions;

export default playerSlice.reducer;
