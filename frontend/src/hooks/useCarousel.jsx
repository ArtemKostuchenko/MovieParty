import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSlideDone,
  setTimeId,
  setActiveSlideIndex,
} from "../features/store/slices/carousel";

const useCarousel = (duration = 5000, length = 1) => {
  const dispatch = useDispatch();
  const { activeSlideIndex, isSlideDone, timeId } = useSelector(
    (store) => store.carousel
  );

  useEffect(() => {
    if (isSlideDone) {
      dispatch(handleSlideDone(false));
      dispatch(
        setTimeId(
          setTimeout(() => {
            nextSlide();
            dispatch(handleSlideDone(true));
          }, duration)
        )
      );
    }
  }, [isSlideDone]);

  const nextSlide = () => {
    const newIndex = activeSlideIndex >= length - 1 ? 0 : activeSlideIndex + 1;
    dispatch(setActiveSlideIndex(newIndex));
  };

  const prevSlide = () => {
    const newIndex = activeSlideIndex <= 0 ? length - 1 : activeSlideIndex - 1;
    dispatch(setActiveSlideIndex(newIndex));
  };

  const handleAutoPlayStop = () => {
    if (timeId > 0) {
      clearTimeout(timeId);
      dispatch(handleSlideDone(false));
    }
  };

  const handleAutoPlayStart = () => {
    if (!isSlideDone) {
      dispatch(handleSlideDone(true));
    }
  };

  const handleSetActiveSlideIndex = (index) => {
    dispatch(setActiveSlideIndex(index));
    handleAutoPlayStop();
  };

  return {
    activeSlideIndex,
    nextSlide,
    prevSlide,
    handleSetActiveSlideIndex,
    handleAutoPlayStart,
    handleAutoPlayStop,
  };
};

export default useCarousel;
