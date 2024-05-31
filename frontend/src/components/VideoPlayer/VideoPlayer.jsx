import React from "react";
import "./style.component.scss";
import ReactPlayer from "react-player";

const VideoPlayer = ({ soundTracks, seasons }) => {
  return (
    <div className="video-player">
      <div className="video-player__display">
        <ReactPlayer
          url={soundTracks[0].m3u8Links[0].m3u8URL}
          width="100%"
          height="100%"
        />
      </div>
      <div className="video-player__controls">
        <button className="video-player__play">
          <div className="icon play"></div>
        </button>
        <div className="video-player__seek">
          <input type="range" className="seek-slider" />
        </div>
        <div className="video-player__time">
          <div className="video-player__time-current">1:20:25</div>
          <span className="video-player__time-split">/</span>
          <div className="video-player__time-duration">1:40:25</div>
        </div>
        <div className="video-player__volume">
          <button className="video-player__volume-button">
            <div className="icon volume v-100"></div>
          </button>
          <div className="video-player__volume-seek">
            <input type="range" className="seek-slider gray" />
          </div>
        </div>
        <button className="video-player__settings">
          <div className="icon settings"></div>
        </button>
        <button className="video-player__p-in-p">
          <div className="icon p-in-p exit"></div>
        </button>
        <button className="video-player__full-screen">
          <div className="icon full-screen off"></div>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
