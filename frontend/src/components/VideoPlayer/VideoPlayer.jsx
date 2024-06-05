import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import "./style.component.scss";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { convertTimeHumanFormat } from "../../features/utils/functions";
import SeekSlider from "../Sliders/SeekSlider";
import VolumeSlider from "../Sliders/VolumeSlider";
import SettingsPlayer from "./SettingsPlayer";

const VideoPlayer = ({ soundTracks, seasons }) => {
  const {
    m3u8URL,
    isPlaying,
    volume,
    speed,
    isEnablePIP,
    isFullScreen,
    isSettingsOpen,
    handleDisablePIP,
    handleTogglePlaying,
    handleChangeVolume,
    handleToggleVolume,
    handleTogglePIP,
    handleToggleFullScreen,
  } = useVideoPlayer();

  const playerRef = useRef();
  const videoPlayerRef = useRef();
  const controlsRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
    if (!controlsRef.current.contains(e.target)) {
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

  const handleReady = () => {};

  const handlePlay = () => {
    if (isSettingsOpen) return;
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
    }
  };

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
      <div className="video-player__display" onClick={handlePlay}>
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              className="video-player__play-center"
              initial={{
                opacity: 0,
                scale: 4,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 4 }}
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
                <SeekSlider
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleSeekSliderChange}
                />
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
                  onClick={handleToggleVolume}
                >
                  <div
                    className={`icon volume${
                      volume <= 0.5
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
                    value={volume * 100}
                    min={0}
                    max={100}
                    step={10}
                    onChange={handleChangeVolume}
                    dark
                    scrollable
                  />
                </div>
              </div>
              <SettingsPlayer soundTracks={soundTracks} />

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
