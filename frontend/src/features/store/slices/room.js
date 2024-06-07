import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: true,
  isUsersOpen: false,
  inviteCode: null,
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
  },
});

export const { setChatState, setInviteCode, setUsersState } = roomSlice.actions;

export default roomSlice.reducer;
