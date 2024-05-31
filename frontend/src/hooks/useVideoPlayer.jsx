import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingState } from "../features/store/slices/player";

const useVideoPlayer = () => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((store) => store.player);

  const handlePlay = () => {
    dispatch(setPlayingState(true));
  };

  const handlePause = () => {
    dispatch(setPlayingState(false));
  };

  const handleTogglePlaying = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleKey = (event) => {
    if (event.code === "Space") {
      handleTogglePlaying();
    }
  };

  return {
    isPlaying,
    handlePlay,
    handlePause,
    handleKey,
    handleTogglePlaying,
  };
};

export default useVideoPlayer;
