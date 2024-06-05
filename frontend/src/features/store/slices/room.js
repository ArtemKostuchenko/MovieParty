import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: true,
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
  },
});

export const { setChatState, setInviteCode } = roomSlice.actions;

export default roomSlice.reducer;
