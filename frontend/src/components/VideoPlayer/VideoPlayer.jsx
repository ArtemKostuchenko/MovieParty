import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./style.component.scss";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { convertTimeHumanFormat } from "../../features/utils/functions";
import SeekSlider from "../Sliders/SeekSlider";
import VolumeSlider from "../Sliders/VolumeSlider";

const VideoPlayer = ({ soundTracks, seasons }) => {
  const {
    isPlaying,
    volume,
    isEnablePIP,
    handleDisablePIP,
    handleTogglePlaying,
    handleChangeVolume,
    handleToggleVolume,
    handleTogglePIP,
  } = useVideoPlayer();
  const playerRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleReady = () => {};

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

  return (
    <div className="video-player">
      <div className="video-player__display" onClick={handleTogglePlaying}>
        {!isPlaying && <div className="video-player__filter"></div>}
        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          volume={volume}
          pip={isEnablePIP}
          url={soundTracks[0].m3u8Links[0].m3u8URL}
          width="100%"
          height="100%"
          onReady={handleReady}
          onDuration={handleDuration}
          onProgress={handleProgress}
          onDisablePIP={handleDisablePIP}
        />
      </div>
      <div className="video-player__controls">
        <button
          className="video-player__play"
          onClick={handleTogglePlaying}
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
        <button className="video-player__settings">
          <div className="icon settings"></div>
        </button>
        <button className="video-player__p-in-p" onClick={handleTogglePIP}>
          <div
            className={`icon p-in-p ${isEnablePIP ? " inner" : " exit"}`}
          ></div>
        </button>
        <button className="video-player__full-screen">
          <div className="icon full-screen off"></div>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
