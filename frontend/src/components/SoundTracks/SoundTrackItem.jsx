import React, { useState, useEffect } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { DropDown, DropDownItem } from "../index";

const qualities = ["480p", "720p", "1080p", "1440p", "2160p"];

const SoundTrackItem = ({
  index,
  title,
  control,
  register,
  removeSoundTrack,
}) => {
  const {
    fields: m3u8Links,
    append: appendM3U8Link,
    remove: removeM3U8Link,
    update: updateM3U8Link,
  } = useFieldArray({
    control,
    name: `soundTracks.${index}.m3u8Links`,
  });

  const [availableQualities, setAvailableQualities] = useState(() =>
    qualities.filter((quality) => quality !== "1080p")
  );

  useEffect(() => {
    const usedQualities = m3u8Links.map((link) => link.quality);
    setAvailableQualities(
      qualities.filter((quality) => !usedQualities.includes(quality))
    );
  }, [m3u8Links]);

  const handleAddM3U8Link = () => {
    if (availableQualities.length === 0) return;

    const newQuality = availableQualities[0];
    appendM3U8Link({ quality: newQuality, m3u8URL: "" });
  };

  const handleRemoveM3U8Link = (m3u8Index) => {
    const removedQuality = m3u8Links[m3u8Index].quality;
    removeM3U8Link(m3u8Index);
    setAvailableQualities((prev) => [...prev, removedQuality].sort());
  };

  const handleQualityChange = (m3u8Index, newQuality) => {
    const previousQuality = m3u8Links[m3u8Index].quality;
    updateM3U8Link(m3u8Index, { ...m3u8Links[m3u8Index], quality: newQuality });

    setAvailableQualities((prev) => {
      const withoutNew = prev.filter((q) => q !== newQuality);
      if (!withoutNew.includes(previousQuality)) {
        withoutNew.push(previousQuality);
      }
      return withoutNew.sort();
    });
  };

  return (
    <div className="sound-tracks__item">
      <div className="sound-track__flex">
        <div className="sound-track__title">{title}</div>
        <button
          type="button"
          className="button remove rounded"
          onClick={() => removeSoundTrack(index)}
        >
          <div className="icon close" />
        </button>
      </div>
      <div className="sound-track__links">
        <div className="sound-track__links-title">
          Посилання відео-якості звукової доріжки
        </div>
        {m3u8Links.map((m3u8Link, m3u8Index) => (
          <div className="sound-track__link" key={m3u8Link.id}>
            <Controller
              name={`soundTracks.${index}.m3u8Links.${m3u8Index}.quality`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDown
                  value={value}
                  onChange={(newValue) => {
                    handleQualityChange(m3u8Index, newValue);
                    onChange(newValue);
                  }}
                  placeholder="Оберіть якість"
                >
                  {[...availableQualities, value].map((quality, index) => (
                    <DropDownItem key={`quality_${index}`} value={quality}>
                      {quality}
                    </DropDownItem>
                  ))}
                </DropDown>
              )}
            />

            <input
              type="text"
              {...register(
                `soundTracks.${index}.m3u8Links.${m3u8Index}.m3u8URL`
              )}
              className="form__input linear"
            />
            <button
              type="button"
              className="button remove rounded"
              onClick={() => handleRemoveM3U8Link(m3u8Index)}
            >
              <div className="icon close" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button primary"
          onClick={() => handleAddM3U8Link()}
          disabled={availableQualities.length === 0}
        >
          Додати відео-посилання
        </button>
      </div>
    </div>
  );
};

export default SoundTrackItem;
