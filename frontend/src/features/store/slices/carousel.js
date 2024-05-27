import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSlideIndex: 0,
  isSlideDone: true,
  timeId: null,
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setActiveSlideIndex: (state, action) => {
      state.activeSlideIndex = action.payload;
    },

    handleSlideDone: (state, action) => {
      state.isSlideDone = action.payload;
    },

    setTimeId: (state, action) => {
      state.timeId = action.payload;
    },
  },
});

export const { setActiveSlideIndex, handleSlideDone, setTimeId } =
  carouselSlice.actions;

export default carouselSlice.reducer;
