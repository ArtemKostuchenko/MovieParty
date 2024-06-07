import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import "./style.component.scss";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { convertTimeHumanFormat } from "../../features/utils/functions";
import SeekSlider from "../Sliders/SeekSlider";
import VolumeSlider from "../Sliders/VolumeSlider";
import SettingsPlayer from "./SettingsPlayer";

const defaultControls = {
  play: true,
  seek: true,
  pInp: true,
  settings: {
    soundTrack: true,
    quality: true,
    speed: true,
  },
};

const VideoPlayer = ({
  controls = {
    play: true,
    seek: true,
    pInp: true,
    settings: {
      soundTrack: true,
      quality: true,
      speed: true,
    },
  },
  autoplay = false,
  seek = 0,
  handleSeekChange,
  soundTracks,
  seasons,
}) => {
  const mergedControls = {
    ...defaultControls,
    ...controls,
    settings: {
      ...defaultControls.settings,
      ...controls.settings,
    },
  };

  const {
    m3u8URL,
    isPlaying,
    volume,
    muted,
    speed,
    isEnablePIP,
    isFullScreen,
    isSettingsOpen,
    handleDisablePIP,
    handleTogglePlaying,
    handleChangeVolume,
    handleToggleMute,
    handleMute,
    handleTogglePIP,
    handleToggleFullScreen,
    handlePlay: play,
  } = useVideoPlayer();

  const playerRef = useRef();
  const videoPlayerRef = useRef();
  const controlsRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeSeek, setTimeSeek] = useState(seek);
  const [autoPlay, setAutoPlay] = useState(autoplay);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      startHideControlsTimer();
    } else {
      clearHideControlsTimer();
      setShowControls(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isEnablePIP && !mergedControls.pInp) {
      navigator.mediaSession.setActionHandler("play", function () {});
      navigator.mediaSession.setActionHandler("pause", function () {});
    }
  }, [isEnablePIP]);

  const startHideControlsTimer = () => {
    clearHideControlsTimer();
    hideControlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const clearHideControlsTimer = () => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
  };

  const handleMouseMove = (e) => {
    setShowControls(true);
    if (controlsRef.current && !controlsRef.current.contains(e.target)) {
      if (isPlaying) {
        startHideControlsTimer();
      }
    } else {
      clearHideControlsTimer();
    }
  };

  const handleControlsMouseEnter = () => {
    clearHideControlsTimer();
  };

  const handleControlsMouseLeave = () => {
    if (isPlaying) {
      startHideControlsTimer();
    }
  };

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;
    if (videoPlayer) {
      videoPlayer.addEventListener("mousemove", handleMouseMove);
      return () => {
        videoPlayer.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isPlaying]);

  const handleReady = () => {
    if (autoplay) {
      play();
    }
  };

  const handlePlay = () => {
    if (isSettingsOpen || !mergedControls.play) return;
    handleTogglePlaying();
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = ({ playedSeconds }) => {
    setCurrentTime(playedSeconds);
  };

  const handleSeekSliderChange = (seek) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seek, "seconds");

      if (!handleSeekChange || typeof handleSeekChange !== "function") return;

      handleSeekChange(seek);
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(timeSeek, "seconds");
    }
  }, [timeSeek]);

  useEffect(() => {
    setTimeSeek(seek);
  }, [seek]);

  useEffect(() => {
    if (autoPlay) {
      handleMute();
    }
    setAutoPlay(autoplay);
  }, [autoplay]);

  useEffect(() => {
    if (m3u8URL) {
      setTimeout(() => {
        playerRef.current.seekTo(currentTime, "seconds");
      }, 100);
    }
  }, [m3u8URL]);

  return (
    <div className="video-player" ref={videoPlayerRef}>
      {!isPlaying && <div className="video-player__filter"></div>}
      <div
        className="video-player__display"
        onClick={!isEnablePIP ? handlePlay : undefined}
      >
        <AnimatePresence>
          {!isPlaying && !isEnablePIP && (
            <motion.button
              className="video-player__play-center"
              initial={{
                opacity: 0,
                scale: 4,
                x: "-50%",
                y: "-50%",
              }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{
                opacity: 0,
                scale: 4,
                x: "-50%",
                y: "-50%",
              }}
              transition={{ duration: 0.2 }}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="icon play big"></div>
            </motion.button>
          )}
        </AnimatePresence>

        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          volume={volume}
          playbackRate={speed}
          pip={isEnablePIP}
          url={m3u8URL || soundTracks[0].m3u8Links[0].m3u8URL}
          width="100%"
          height="99%"
          onReady={handleReady}
          onDuration={handleDuration}
          onProgress={handleProgress}
          onDisablePIP={handleDisablePIP}
          muted={muted || autoPlay}
        />
      </div>
      {!isEnablePIP && (
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="video-player__controls"
              ref={controlsRef}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={handleControlsMouseEnter}
              onMouseLeave={handleControlsMouseLeave}
            >
              <button
                className="video-player__play"
                onClick={handlePlay}
                tabIndex={-1}
              >
                <div className={`icon${isPlaying ? " pause" : " play"}`}></div>
              </button>
              <div className="video-player__seek">
                {mergedControls.seek && (
                  <SeekSlider
                    value={currentTime}
                    min={0}
                    max={duration}
                    onChange={handleSeekSliderChange}
                  />
                )}
              </div>
              <div className="video-player__time">
                <div className="video-player__time-current">
                  {convertTimeHumanFormat(currentTime)}
                </div>
                <span className="video-player__time-split">/</span>
                <div className="video-player__time-duration">
                  {convertTimeHumanFormat(duration)}
                </div>
              </div>
              <div className="video-player__volume">
                <button
                  className="video-player__volume-button"
                  onClick={() => {
                    if (autoPlay) {
                      setAutoPlay(false);
                    }
                    handleToggleMute();
                  }}
                >
                  <div
                    className={`icon volume${
                      autoPlay
                        ? " v-mute"
                        : volume <= 0.5
                        ? volume <= 0.25
                          ? volume === 0
                            ? " v-mute"
                            : " v-25"
                          : " v-50"
                        : " v-100"
                    }`}
                  ></div>
                </button>
                <div className="video-player__volume-seek">
                  <VolumeSlider
                    value={autoPlay ? 0 : volume * 100}
                    min={0}
                    max={100}
                    step={10}
                    onChange={(value) => {
                      if (autoPlay) {
                        setAutoPlay(false);
                      }
                      handleChangeVolume(value);
                    }}
                    dark
                    scrollable
                  />
                </div>
              </div>
              <SettingsPlayer
                controls={mergedControls.settings}
                soundTracks={soundTracks}
              />
              <button
                className="video-player__p-in-p"
                onClick={handleTogglePIP}
              >
                <div
                  className={`icon p-in-p ${isEnablePIP ? " inner" : " exit"}`}
                ></div>
              </button>
              <button
                className="video-player__full-screen"
                onClick={() => handleToggleFullScreen(videoPlayerRef.current)}
              >
                <div
                  className={`icon full-screen ${
                    isFullScreen ? " on" : " off"
                  }`}
                ></div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default VideoPlayer;
