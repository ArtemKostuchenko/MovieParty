import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayingState,
  setVolumeState,
  setEnablePIPState,
  setFullScreenState,
} from "../features/store/slices/player";

const useVideoPlayer = () => {
  const dispatch = useDispatch();
  const { isPlaying, volume, isEnablePIP, isFullScreen } = useSelector(
    (store) => store.player
  );
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

  const handleDisablePIP = () => {
    if (!isEnablePIP) return;
    dispatch(setEnablePIPState(false));
  };

  const handleTogglePIP = () => {
    if (isEnablePIP) {
      handleDisablePIP();
    } else {
      dispatch(setEnablePIPState(true));
    }
  };

  const handleFullScreenChange = () => {
    dispatch(setFullScreenState(document.fullscreenElement != null));
  };

  const handleToggleFullScreen = (element) => {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => console.log(err));
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return {
    isPlaying,
    volume,
    isEnablePIP,
    isFullScreen,
    handlePlay,
    handlePause,
    handleDisablePIP,
    handleTogglePlaying,
    handleChangeVolume,
    handleToggleVolume,
    handleTogglePIP,
    handleToggleFullScreen,
  };
};

export default useVideoPlayer;
