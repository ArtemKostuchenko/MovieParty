import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettingState,
  setSpeedState,
  setM3U8State,
} from "../../features/store/slices/player";

const SettingsPlayer = ({ soundTracks }) => {
  const dispatch = useDispatch();
  const { isSettingsOpen, speed: speedState } = useSelector(
    (store) => store.player
  );
  const [openMenu, setOpenMenu] = useState(null);
  const [soundTrack, setSoundTrack] = useState(soundTracks[0].title);
  const [quality, setQuality] = useState(soundTracks[0].m3u8Links[0].quality);
  const [speed, setSpeed] = useState(speedState);

  const soundTracksTitles = soundTracks.map((sTrack) => sTrack.title);

  const m3u8Links = soundTracks
    .find((sTrack) => sTrack.title === soundTrack)
    .m3u8Links.map((m3u8Link) => m3u8Link.quality);

  const settingsRef = useRef(null);

  const handleSoundTrackChange = (value) => {
    if (soundTrack === value) return;

    const m3u8Link = soundTracks
      .find((sTrack) => sTrack.title === value)
      ?.m3u8Links.find((m3u8Link) => m3u8Link.quality === quality);

    if (!m3u8Link) return;

    setSoundTrack(value);

    dispatch(setM3U8State(m3u8Link.m3u8URL));
  };
  const handleQualityChange = (value) => {
    if (quality === value) return;

    const m3u8Link = soundTracks
      .find((sTrack) => sTrack.title === soundTrack)
      ?.m3u8Links.find((m3u8Link) => m3u8Link.quality === value);

    if (!m3u8Link) return;

    setQuality(value);

    dispatch(setM3U8State(m3u8Link.m3u8URL));
  };
  const handleSpeedChange = (value) => {
    if (speed === value) return;
    dispatch(setSpeedState(value));
  };

  const toggleOpen = () => {
    setOpenMenu(null);
    dispatch(setSettingState(!isSettingsOpen));
  };

  const closeMenu = () => {
    setOpenMenu(null);
    dispatch(setSettingState(false));
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    setSpeed(speedState);
  }, [speedState]);

  return (
    <div
      className="video-player__settings"
      ref={settingsRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={`video-player__settings-button${
          isSettingsOpen ? " anim" : ""
        }`}
        onClick={toggleOpen}
      >
        <div className="icon settings"></div>
      </button>
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            className="video-player__settings-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {!openMenu && (
              <>
                <button
                  className="video-player__settings-menu-item"
                  onClick={() => setOpenMenu("soundTracks")}
                >
                  <div className="video-player__settings-menu-title">
                    Звукова доріжка
                  </div>
                  <div className="video-player__settings-menu-title">
                    {soundTrack}
                    <span className="arr-sls"></span>
                  </div>
                </button>
                <button
                  className="video-player__settings-menu-item"
                  onClick={() => setOpenMenu("qualities")}
                >
                  <div className="video-player__settings-menu-title">
                    Якість
                  </div>
                  <div className="video-player__settings-menu-title">
                    {quality}
                    <span className="arr-sls"></span>
                  </div>
                </button>
                <button
                  className="video-player__settings-menu-item"
                  onClick={() => setOpenMenu("speed")}
                >
                  <div className="video-player__settings-menu-title">
                    Швидкість
                  </div>
                  <div className="video-player__settings-menu-title">
                    {speed}
                    <span className="arr-sls"></span>
                  </div>
                </button>
              </>
            )}
            {openMenu === "soundTracks" && (
              <SettingsSelectItem
                title={"Звукова доріжка"}
                items={soundTracksTitles}
                value={soundTrack}
                onGoBack={() => setOpenMenu(null)}
                onChange={handleSoundTrackChange}
              />
            )}
            {openMenu === "qualities" && (
              <SettingsSelectItem
                title={"Якість"}
                items={m3u8Links}
                value={quality}
                quality
                onGoBack={() => setOpenMenu(null)}
                onChange={handleQualityChange}
              />
            )}
            {openMenu === "speed" && (
              <SettingsSelectItem
                title={"Швидкість"}
                items={[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0]}
                value={speed}
                speed
                onGoBack={() => setOpenMenu(null)}
                onChange={handleSpeedChange}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SettingsSelectItem = ({
  title,
  value,
  items,
  quality = false,
  speed = false,
  onGoBack,
  onChange,
}) => {
  const handleOnGoBack = () => {
    if (!onGoBack || typeof onGoBack !== "function") return;

    onGoBack();
  };

  const handleChangeValue = (val) => {
    if (!onChange || typeof onChange !== "function") return;

    onChange(val);
    handleOnGoBack();
  };

  return (
    <motion.div
      className="video-player__settings-menu-nest-list"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="video-player__settings-menu-nest-list-back">
        <button
          className="video-player__settings-menu-item"
          onClick={handleOnGoBack}
        >
          <div className="video-player__settings-menu-title ong">
            <span className="arr-sls lf"></span>
            {title}
          </div>
        </button>
      </div>
      <div className="video-player__settings-menu-nest-list-items">
        {items.map((item) => {
          return (
            <button
              className="video-player__settings-menu-nest-list-item"
              key={item}
              onClick={() => handleChangeValue(item)}
            >
              <div className="settings-radio">
                {quality && (
                  <label className="settings-radio-title jc">
                    {item}
                    <span
                      className={`quality-mark ${
                        item === "1080p"
                          ? " fhd"
                          : item === "720p"
                          ? " hd"
                          : item === "480p"
                          ? " sd"
                          : ""
                      }`}
                    >
                      {item === "1080p"
                        ? "fhd"
                        : item === "720p"
                        ? "hd"
                        : item === "480p"
                        ? "sd"
                        : ""}
                    </span>
                  </label>
                )}
                {!quality && (
                  <label className="settings-radio-title">
                    {speed ? `${item.toFixed(2)}x` : item}
                  </label>
                )}
                <input
                  type="radio"
                  name={title}
                  value={item}
                  checked={item === value}
                  readOnly
                />
                <span className="checkmark"></span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SettingsPlayer;
