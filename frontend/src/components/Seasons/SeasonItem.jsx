import React from "react";
import { useFieldArray } from "react-hook-form";
import EpisodeItem from "../Episodes/EpisodeItem";

const SeasonsItem = ({ index, control, register, removeSeason }) => {
  const {
    fields: episodes,
    append: appendEpisode,
    remove: removeEpisode,
  } = useFieldArray({
    control,
    name: `seasons.${index}.episodes`,
  });

  const handleAddEpisode = () => {
    appendEpisode({
      name: "",
      status: "waiting",
      available: false,
      releaseDate: "",
      soundTracks: [],
    });
  };

  return (
    <div className="seasons__item">
      <div className="season__flex">
        <div className="season__name">
          <input
            type="text"
            {...register(`seasons.${index}.title`)}
            className="form__input linear"
            placeholder="Назва сезону (опціонально)"
          />
        </div>
        <button
          className="button remove rounded"
          type="button"
          onClick={() => removeSeason(index)}
        >
          <div className="icon close" />
        </button>
      </div>
      <div className="season__button">
        <button
          className="button primary fill"
          type="button"
          onClick={handleAddEpisode}
        >
          Додати cерію
        </button>
      </div>
      <div className="season__episodes">
        <div className="episodes">
          <div className="episodes__list">
            {episodes.map((episode, episodeIndex) => {
              return (
                <EpisodeItem
                  key={episode.id}
                  seasonIndex={index}
                  episodeIndex={episodeIndex}
                  {...episode}
                  control={control}
                  register={register}
                  removeEpisode={removeEpisode}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonsItem;
