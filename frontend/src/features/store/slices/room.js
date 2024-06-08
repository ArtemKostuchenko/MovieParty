import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: true,
  isUsersOpen: false,
  inviteCode: null,
  isMicOn: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setChatState: (state, action) => {
      state.isChatOpen = action.payload;
    },
    setInviteCode: (state, action) => {
      state.inviteCode = action.payload;
    },
    setUsersState: (state, action) => {
      state.isUsersOpen = action.payload;
    },
    setMicrophoneState: (state, action) => {
      state.isMicOn = action.payload;
    },
  },
});

export const {
  setChatState,
  setInviteCode,
  setUsersState,
  setMicrophoneState,
} = roomSlice.actions;

export default roomSlice.reducer;
