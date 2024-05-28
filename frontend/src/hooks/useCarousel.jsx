import { useEffect } from "react";
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
      startAutoPlay();
    }

    return () => clearTimeout(timeId);
  }, [isSlideDone]);

  const startAutoPlay = () => {
    clearTimeout(timeId);
    const id = setTimeout(() => {
      nextSlide();
      dispatch(handleSlideDone(true));
    }, duration);
    dispatch(setTimeId(id));
  };

  const stopAutoPlay = () => {
    clearTimeout(timeId);
    dispatch(handleSlideDone(false));
  };

  const nextSlide = () => {
    stopAutoPlay();
    const newIndex = activeSlideIndex >= length - 1 ? 0 : activeSlideIndex + 1;
    dispatch(setActiveSlideIndex(newIndex));
    dispatch(handleSlideDone(true));
  };

  const prevSlide = () => {
    stopAutoPlay();
    const newIndex = activeSlideIndex <= 0 ? length - 1 : activeSlideIndex - 1;
    dispatch(setActiveSlideIndex(newIndex));
    dispatch(handleSlideDone(true));
  };

  const handleAutoPlayStop = () => {
    stopAutoPlay();
  };

  const handleAutoPlayStart = () => {
    startAutoPlay();
  };

  const handleSetActiveSlideIndex = (index) => {
    stopAutoPlay();
    dispatch(setActiveSlideIndex(index));
    dispatch(handleSlideDone(true));
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
