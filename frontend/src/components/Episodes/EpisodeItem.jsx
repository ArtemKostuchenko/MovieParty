import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { DropDown, DropDownItem } from "../index";
import SoundTrackItem from "../SoundTracks/SoundTrackItem";

const EpisodeItem = ({
  seasonIndex,
  episodeIndex,
  control,
  register,
  removeEpisode,
}) => {
  const {
    fields: soundTracks,
    append: addSoundTrack,
    remove: removeSoundTrack,
  } = useFieldArray({
    control,
    name: `seasons.${seasonIndex}.episodes.${episodeIndex}.soundTracks`,
  });

  const [soundTrackName, setSoundTrackName] = useState("");

  const handleAddSoundTrack = () => {
    if (!soundTrackName) return;
    addSoundTrack({
      title: soundTrackName.trim(),
      m3u8Links: [
        {
          quality: "1080p",
          m3u8URL: "",
        },
      ],
    });
    setSoundTrackName("");
  };

  return (
    <div className="episodes__item">
      <div className="episode__title">Серія №{episodeIndex + 1}</div>
      <div className="episode__flex">
        <div className="episode__name">
          <input
            type="text"
            {...register(
              `seasons.${seasonIndex}.episodes.${episodeIndex}.name`
            )}
            className="form__input linear"
            placeholder="Назва серії (опціонально)"
          />
        </div>
        <button
          className="button remove rounded"
          type="button"
          onClick={() => removeEpisode(episodeIndex)}
        >
          <div className="icon close" />
        </button>
      </div>
      <div className="form__item label">
        <div className="form__item-label">Статус серії</div>
        <Controller
          name={`seasons.${seasonIndex}.episodes.${episodeIndex}.status`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropDown
              value={value}
              onChange={onChange}
              placeholder="Оберіть статус серії"
              fill
            >
              <DropDownItem value="Announced">Анонсовано</DropDownItem>
              <DropDownItem value="waiting">Очікуємо</DropDownItem>
              <DropDownItem value="ended">Завершено</DropDownItem>
            </DropDown>
          )}
        />
      </div>
      <div className="form__item label">
        <div className="form__item-label">Доступність серії</div>
        <Controller
          name={`seasons.${seasonIndex}.episodes.${episodeIndex}.available`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DropDown
              value={value}
              onChange={onChange}
              placeholder="Оберіть доступність серії"
              fill
            >
              <DropDownItem value={true}>Доступна</DropDownItem>
              <DropDownItem value={false}>Прихована</DropDownItem>
            </DropDown>
          )}
        />
      </div>
      <div className="form__item label">
        <div className="form__item-label">Дата релізу серії</div>
        <input
          type="date"
          {...register(
            `seasons.${seasonIndex}.episodes.${episodeIndex}.releaseDate`
          )}
          className="form__input linear"
        />
      </div>
      <div className="form__item label">
        <div className="form__item-label">Звукові доріжки</div>
        <div className="form__input linear fi">
          <input
            type="text"
            className="form__input"
            onChange={(e) => setSoundTrackName(e.target.value)}
            value={soundTrackName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSoundTrack();
              }
            }}
            placeholder="Назва звукової доріжки"
          />
          <button
            type="button"
            className="form__button-add"
            onClick={handleAddSoundTrack}
          >
            <div className="icon plus rounded" />
          </button>
        </div>
        <div className="sound-tracks">
          <div className="sound-tracks__list">
            {soundTracks.map((soundTrack, index) => {
              return (
                <SoundTrackItem
                  key={soundTrack.id}
                  index={index}
                  seasonIndex={seasonIndex}
                  episodeIndex={episodeIndex}
                  {...soundTrack}
                  control={control}
                  register={register}
                  removeSoundTrack={removeSoundTrack}
                  isSeason
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeItem;
