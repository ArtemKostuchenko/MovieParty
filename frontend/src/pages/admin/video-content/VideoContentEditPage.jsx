import React, { useState, useEffect } from "react";
import "./style.page.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VideoContentSchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import { useGetVideoContentByIdQuery } from "../../../features/services/content/contentService";
import useVideoContent from "../../../hooks/useVideoContent";
import { useGetTypesContentQuery } from "../../../features/services/type-content/typeContentService";
import SoundTrackItem from "../../../components/SoundTracks/SoundTrackItem";
import SearchCountries from "../../../components/Countries/SearchCountries";
import SearchGenres from "../../../components/Genres/SearchGenres";
import SearchActors from "../../../components/Actors/SearchActors";
import SearchDirectors from "../../../components/Directors/SearchDirectors";
import SearchBestLists from "../../../components/BestLists/SearchBestLists";
import SearchParts from "../../../components/Parts/SearchParts";
import { formatDate } from "../../../features/utils/functions";

const VideoContentEditPage = () => {
  const { updateVideoContent, isLoadingUpdate } = useVideoContent();

  const { id: editId } = useParams();

  const [soundTrackName, setSoundTrackName] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [backgroundURL, setBackgroundURL] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(VideoContentSchema),
    defaultValues: {
      isEdit: true,
    },
  });

  const {
    fields: soundTracks,
    append: addSoundTrack,
    remove: removeSoundTrack,
  } = useFieldArray({
    control,
    name: "soundTracks",
  });

  if (!editId) {
    return <></>;
  }

  const { data: videoContent, isLoadingVideoContent } =
    useGetVideoContentByIdQuery(editId);

  const { data: typeContentData, isLoading: isLoadingTypeContent } =
    useGetTypesContentQuery();

  useEffect(() => {
    if (videoContent) {
      setValue("title", videoContent.title);
      setValue("originTitle", videoContent.originTitle);
      setValue("IMDb", videoContent.IMDb);
      setValue("description", videoContent.description);
      setValue("typeVideoContent", videoContent.typeVideoContent._id);
      console.log(videoContent.typeVideoContent.name);
      setValue("releaseDate", formatDate(videoContent.releaseDate, "hyphen"));
      setValue("duration", videoContent.duration);
      setValue("trailerURL", videoContent.trailerURL);
      setValue("soundTracks", videoContent.soundTracks);
      setValue("originCountries", videoContent.originCountries);
      setValue("genres", videoContent.genres);
      setValue("actors", videoContent.actors);
      setValue("directors", videoContent.directors);
      setValue("lists", videoContent.lists);
      setValue("parts", [videoContent.part]);
      setPreviewURL(videoContent.previewURL);
      setBackgroundURL(videoContent.backgroundURL);
    }
  }, [videoContent, setValue]);

  if (isLoadingVideoContent) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }

  const onSubmitHandler = async (data) => {
    const res = await updateVideoContent({ id: videoContent._id, ...data });
    console.log(res);
    reset();
    navigate("/panel/admin/video-content");
  };

  const resetPhoto = (field) => {
    resetField(field);
  };

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

  const watchPreviewURL = watch("previewURL");
  const watchBackgroundURL = watch("backgroundURL");

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <form
            className="video-content__form"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="video-content__form-columns">
              <div className="video-content__form-item">
                <div className="video-content__form-container">
                  <div className="video-content__form-container-title">
                    Основна інформація
                  </div>
                  <div className="video-content__form-container-description">
                    Ця інформація є обов'язковою для створення відеоконтенту
                  </div>
                  <div className="video-content__form-container-form">
                    <div className="form__item label">
                      <div className="form__item-label">
                        Назва відеоконтенту
                      </div>
                      <input
                        type="text"
                        {...register("title")}
                        className="form__input linear"
                      />
                      {errors.title && (
                        <span className="message error">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">
                        Назва відеоконтенту (англійською)
                      </div>
                      <input
                        type="text"
                        {...register("originTitle")}
                        className="form__input linear"
                      />
                      {errors.originTitle && (
                        <span className="message error">
                          {errors.originTitle.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Рейтинг IMDb</div>
                      <input
                        type="number"
                        step="0.1"
                        {...register("IMDb")}
                        className="form__input linear"
                      />
                      {errors.IMDb && (
                        <span className="message error">
                          {errors.IMDb.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Опис відеоконтенту</div>
                      <textarea
                        {...register("description")}
                        className="form__textarea linear"
                      />
                      {errors.description && (
                        <span className="message error">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Тип відеоконтенту</div>
                      {isLoadingTypeContent || isLoadingVideoContent ? (
                        <div className="loader__container">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        <div className="overflow-content">
                          <div className="form__radio-list">
                            {typeContentData.typesContent.map((typeContent) => {
                              const { _id, name } = typeContent;
                              return (
                                <div
                                  className="form__radio-list-item"
                                  key={_id}
                                >
                                  <input
                                    type="radio"
                                    {...register("typeVideoContent")}
                                    className="form__radio-list-item-elem"
                                    value={_id}
                                    id={_id}
                                  />
                                  <label
                                    htmlFor={_id}
                                    className="form__radio-list-item-title"
                                  >
                                    {name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {errors.typeVideoContent && (
                        <span className="message error">
                          {errors.typeVideoContent.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Дата релізу</div>
                      <input
                        type="date"
                        {...register("releaseDate")}
                        className="form__input linear"
                      />
                      {errors.releaseDate && (
                        <span className="message error">
                          {errors.releaseDate.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Тривалість</div>
                      <input
                        type="text"
                        {...register("duration")}
                        className="form__input linear"
                      />
                      {errors.duration && (
                        <span className="message error">
                          {errors.duration.message}
                        </span>
                      )}
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">
                        Трейлер відеоконтенту (YouTube)
                      </div>
                      <input
                        type="text"
                        {...register("trailerURL")}
                        className="form__input linear"
                      />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Звукова доріжка</div>
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
                                {...soundTrack}
                                control={control}
                                register={register}
                                removeSoundTrack={removeSoundTrack}
                              />
                            );
                          })}
                        </div>
                      </div>
                      {errors.soundTracks && (
                        <span className="message error">
                          {errors.soundTracks.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="video-content__form-item">
                <div className="video-content__form-rs">
                  <div className="video-content__form-images">
                    <div className="video-content__form-images-container">
                      <div className="video-content__form-images-title">
                        {!Boolean(watchPreviewURL?.length) &&
                        !Boolean(previewURL)
                          ? `Оберіть основне `
                          : `Основне `}
                        фото відеоконтенту
                      </div>
                      {!Boolean(watchPreviewURL?.length) &&
                      !Boolean(previewURL) ? (
                        <button
                          type="button"
                          className="button primary"
                          onClick={() => {
                            const inputRef = document.querySelector(
                              'input[name="previewURL"]'
                            );
                            if (!inputRef) return;
                            inputRef.click();
                          }}
                        >
                          Обрати фото
                        </button>
                      ) : (
                        <div className="video-content__form-image">
                          <PreviewImage
                            icon={previewURL || watchPreviewURL}
                            removeIcon={() => {
                              if (previewURL) {
                                setPreviewURL(null);
                                return;
                              }
                              resetPhoto("previewURL");
                            }}
                            path="images/content"
                            classImage="video-content__form-preview"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        {...register("previewURL")}
                        className="hidden"
                        accept="image/*"
                      />
                      {errors.previewURL && (
                        <span className="message error">
                          {errors.previewURL.message}
                        </span>
                      )}
                    </div>
                    <div className="video-content__form-images-container">
                      <div className="video-content__form-images-title">
                        {!Boolean(watchBackgroundURL?.length) &&
                        !Boolean(backgroundURL)
                          ? `Оберіть задній `
                          : `Задній `}
                        фон відеоконтенту
                      </div>
                      {!Boolean(watchBackgroundURL?.length) &&
                      !Boolean(backgroundURL) ? (
                        <button
                          type="button"
                          className="button primary"
                          onClick={() => {
                            const inputRef = document.querySelector(
                              'input[name="backgroundURL"]'
                            );
                            if (!inputRef) return;
                            inputRef.click();
                          }}
                        >
                          Обрати фон
                        </button>
                      ) : (
                        <div className="video-content__form-image">
                          <PreviewImage
                            icon={backgroundURL || watchBackgroundURL}
                            removeIcon={() => {
                              if (backgroundURL) {
                                setBackgroundURL(null);
                                return;
                              }
                              resetPhoto("backgroundURL");
                            }}
                            path="images/content"
                            classImage="video-content__form-background"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        {...register("backgroundURL")}
                        className="hidden"
                        accept="image/*"
                      />
                      {errors.backgroundURL && (
                        <span className="message error">
                          {errors.backgroundURL.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="button primary"
                    disabled={!isDirty || !isValid || isLoadingUpdate}
                  >
                    Зберегти відеоконтент
                  </button>
                </div>
              </div>
            </div>
            <div className="video-content__form-rows">
              <div className="video-content__form-item">
                <div className="video-content__form-container">
                  <div className="video-content__form-container-title">
                    Додаткова інформація
                  </div>
                  <div className="video-content__form-container-description">
                    Ця інформація може бути додана зараз або пізніше
                  </div>
                  <div className="video-content__form-container-form">
                    <div className="form__item label">
                      <div className="form__item-label">Країни</div>
                      <SearchCountries limit={6} control={control} />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Жанри</div>
                      <SearchGenres limit={6} control={control} />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Актори</div>
                      <SearchActors limit={6} control={control} />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Режисери</div>
                      <SearchDirectors limit={6} control={control} />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Найкращі списки</div>
                      <SearchBestLists
                        limit={6}
                        control={control}
                        register={register}
                      />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">
                        Частина відеоконтенту
                      </div>
                      <SearchParts limit={6} control={control} single />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoContentEditPage;
