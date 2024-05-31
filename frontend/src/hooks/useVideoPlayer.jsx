import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayingState,
  setVolumeState,
} from "../features/store/slices/player";

const useVideoPlayer = () => {
  const dispatch = useDispatch();
  const { isPlaying, volume } = useSelector((store) => store.player);
  const lastVolume = useRef();

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

  const handleChangeVolume = (vol) => {
    dispatch(setVolumeState(vol / 100));
  };

  const handleKey = (event) => {
    if (event.code === "Space") {
      handleTogglePlaying();
    }
  };

  const handleToggleVolume = () => {
    if (volume !== 0) {
      lastVolume.current = volume;
      dispatch(setVolumeState(0));
    } else {
      if (lastVolume.current) {
        dispatch(setVolumeState(lastVolume.current));
      } else {
        dispatch(setVolumeState(0.5));
      }
    }
  };

  return {
    isPlaying,
    volume,
    handlePlay,
    handlePause,
    handleTogglePlaying,
    handleChangeVolume,
    handleToggleVolume,
  };
};

export default useVideoPlayer;
