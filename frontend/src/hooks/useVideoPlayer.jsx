import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayingState,
  setVolumeState,
  setMuteState,
  setTimeState,
  setEnablePIPState,
  setFullScreenState,
  setM3U8State,
  setSeasonState,
  setEpisodeState,
} from "../features/store/slices/player";

const useVideoPlayer = () => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    volume,
    muted,
    time,
    isEnablePIP,
    isFullScreen,
    isSettingsOpen,
    speed,
    m3u8URL,
    season,
    episode,
  } = useSelector((store) => store.player);
  const lastVolume = useRef();
  const lastSeason = useRef(season);
  const lastEpisode = useRef(episode);

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
    if (muted && vol > 0) {
      handleUnMute();
    }
    dispatch(setVolumeState(vol / 100));
  };

  const handleKey = (event) => {
    if (event.code === "Space") {
      handleTogglePlaying();
    }
  };

  const handleToggleMute = () => {
    if (volume !== 0 && !muted) {
      lastVolume.current = volume;
      dispatch(setVolumeState(0));
      handleMute();
    } else {
      if (lastVolume.current) {
        dispatch(setVolumeState(lastVolume.current));
      } else {
        dispatch(setVolumeState(0.5));
      }
      handleUnMute();
    }
  };

  const handleMute = () => {
    dispatch(setMuteState(true));
  };

  const handleUnMute = () => {
    dispatch(setMuteState(false));
  };

  const handleTime = (time) => {
    dispatch(setTimeState(time));
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

  const setSeason = (season) => {
    dispatch(setSeasonState(season));
  };

  const setEpisode = (episode) => {
    dispatch(setEpisodeState(episode));
  };

  const sameSeason = (season) => {
    if (lastSeason.current === season) return true;
    lastSeason.current = season;
    return false;
  };

  const sameEpisode = (episode) => {
    if (lastEpisode.current === episode) return true;
    lastSeason.current = episode;
    return false;
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
      setSeason(0);
      setEpisode(0);
      dispatch(setM3U8State(null));
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return {
    m3u8URL,
    muted,
    time,
    isPlaying,
    volume,
    speed,
    isEnablePIP,
    isFullScreen,
    isSettingsOpen,
    handlePlay,
    handlePause,
    handleDisablePIP,
    handleTogglePlaying,
    handleChangeVolume,
    handleToggleMute,
    handleUnMute,
    handleMute,
    handleTime,
    handleTogglePIP,
    handleToggleFullScreen,
    season,
    episode,
    setSeason,
    setEpisode,
    sameSeason,
    sameEpisode,
  };
};

export default useVideoPlayer;
