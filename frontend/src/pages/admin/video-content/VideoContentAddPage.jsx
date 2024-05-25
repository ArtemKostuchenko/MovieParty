import React, { useState } from "react";
import "./style.page.scss";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VideoContentSchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import useVideoContent from "../../../hooks/useVideoContent";
import { useGetTypesContentQuery } from "../../../features/services/type-content/typeContentService";
import SoundTrackItem from "../../../components/SoundTracks/SoundTrackItem";

const VideoContentAddPage = () => {
  const { addVideoContent, isLoadingAdd } = useVideoContent();
  const [soundTrackName, setSoundTrackName] = useState("");
  const { data, isLoading } = useGetTypesContentQuery();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(VideoContentSchema),
  });

  const {
    fields: soundTracks,
    append: addSoundTrack,
    remove: removeSoundTrack,
  } = useFieldArray({
    control,
    name: "soundTracks",
  });

  const onSubmitHandler = async (data) => {
    console.log(data);
    // const res = await addVideoContent(data);
    // console.log(res);
    // reset();
    // navigate("/panel/admin/video-content");
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
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Опис відеоконтенту</div>
                      <textarea
                        {...register("description")}
                        className="form__textarea linear"
                      />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Тип відеоконтенту</div>
                      {isLoading ? (
                        <div className="loader__container">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        <div className="overflow-content">
                          <div className="form__radio-list">
                            {data.typesContent.map((typeContent) => {
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
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Дата релізу</div>
                      <input
                        type="date"
                        {...register("releaseDate")}
                        className="form__input linear"
                      />
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Тривалість</div>
                      <input
                        type="text"
                        {...register("duration")}
                        className="form__input linear"
                      />
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="video-content__form-item">
                <div className="video-content__form-rs">
                  <div className="video-content__form-images">
                    <div className="video-content__form-images-container">
                      <div className="video-content__form-images-title">
                        {!Boolean(watchPreviewURL?.length)
                          ? `Оберіть основне `
                          : `Основне `}
                        фото відеоконтенту
                      </div>
                      {!Boolean(watchPreviewURL?.length) ? (
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
                            icon={watchPreviewURL}
                            removeIcon={() => resetPhoto("previewURL")}
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
                    </div>
                    <div className="video-content__form-images-container">
                      <div className="video-content__form-images-title">
                        {!Boolean(watchBackgroundURL?.length)
                          ? `Оберіть задній `
                          : `Задній `}
                        фон відеоконтенту
                      </div>
                      {!Boolean(watchBackgroundURL?.length) ? (
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
                            icon={watchBackgroundURL}
                            removeIcon={() => resetPhoto("backgroundURL")}
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
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="button primary"
                    disabled={!isDirty || !isValid || isLoadingAdd}
                  >
                    Додати відеоконтент
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
                      <div className="form__input linear fi">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Назва країни"
                        />
                        <button className="form__button-add">
                          <div className="icon plus rounded" />
                        </button>
                      </div>
                      <div className="f-list">
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="flex r center-h g5">
                              <img
                                src="../images/icons/us.svg"
                                className="country-icon"
                                alt="США"
                              />
                              <div className="f-list__content-title">США</div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="flex r center-h g5">
                              <img
                                src="../images/icons/ua.svg"
                                className="country-icon"
                                alt="Україна"
                              />
                              <div className="f-list__content-title">
                                Україна
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="flex r center-h g5">
                              <img
                                src="../images/icons/gb.svg"
                                className="country-icon"
                                alt="Велика Британія"
                              />
                              <div className="f-list__content-title">
                                Велика Британія
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Жанри</div>
                      <div className="form__input linear fi">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Назва жанру"
                        />
                        <button className="form__button-add">
                          <div className="icon plus rounded" />
                        </button>
                      </div>
                      <div className="f-list">
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__content-title">Бойовик</div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__content-title">
                              Фантастика
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__content-title">Екшн</div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__content-title">Пригоди</div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__content-title">Фентезі</div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Актори</div>
                      <div className="form__input linear fi">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Прізвище, ім`я актора"
                        />
                        <button className="form__button-add">
                          <div className="icon plus rounded" />
                        </button>
                      </div>
                      <div className="f-list">
                        <div className="f-list__item top">
                          <div className="f-list__content">
                            <div className="f-list__person">
                              <img
                                src="../images/actor.jpg"
                                className="f-list__person-image"
                              />
                              <div className="f-list__person-info">
                                <div className="f-list__person-fullname">
                                  Керрі Фішер
                                </div>
                                <div className="f-list__person-origin-fullname">
                                  &nbsp;Carrie Fisher
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item top">
                          <div className="f-list__content">
                            <div className="f-list__person">
                              <img
                                src="../images/actor.jpg"
                                className="f-list__person-image"
                              />
                              <div className="f-list__person-info">
                                <div className="f-list__person-fullname">
                                  Керрі Фішер
                                </div>
                                <div className="f-list__person-origin-fullname">
                                  &nbsp;Carrie Fisher
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item top">
                          <div className="f-list__content">
                            <div className="f-list__person">
                              <img
                                src="../images/actor.jpg"
                                className="f-list__person-image"
                              />
                              <div className="f-list__person-info">
                                <div className="f-list__person-fullname">
                                  Керрі Фішер
                                </div>
                                <div className="f-list__person-origin-fullname">
                                  &nbsp;Carrie Fisher
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Режисери</div>
                      <div className="form__input linear fi">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Прізвище, ім`я режисера"
                        />
                        <button className="form__button-add">
                          <div className="icon plus rounded" />
                        </button>
                      </div>
                      <div className="f-list">
                        <div className="f-list__item top">
                          <div className="f-list__content">
                            <div className="f-list__person">
                              <img
                                src="../images/director.webp"
                                className="f-list__person-image"
                              />
                              <div className="f-list__person-info">
                                <div className="f-list__person-fullname">
                                  Джордж Лукас
                                </div>
                                <div className="f-list__person-origin-fullname">
                                  George Lucas
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item top">
                          <div className="f-list__content">
                            <div className="f-list__person">
                              <img
                                src="../images/director.webp"
                                className="f-list__person-image"
                              />
                              <div className="f-list__person-info">
                                <div className="f-list__person-fullname">
                                  Джордж Лукас
                                </div>
                                <div className="f-list__person-origin-fullname">
                                  George Lucas
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">Найкращі списки</div>
                      <div className="form__input linear fi">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Назва списку"
                        />
                        <button className="form__button-add">
                          <div className="icon plus rounded" />
                        </button>
                      </div>
                      <div className="f-list r">
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__best-lists">
                              <div className="f-list__content-title">
                                01 Найкращі серіали в жанрі спорт
                              </div>
                              <input
                                type="text"
                                className="form__input linear"
                                placeholder="Місце"
                              />
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__best-lists">
                              <div className="f-list__content-title">
                                02 Найкращі фільми в жанрі фантастика 2019
                              </div>
                              <input
                                type="text"
                                className="form__input linear"
                                defaultValue={15}
                                placeholder="Місце"
                              />
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                        <div className="f-list__item">
                          <div className="f-list__content">
                            <div className="f-list__best-lists">
                              <div className="f-list__content-title">
                                03 Найкращі фільми в жанрі фентезі 2019
                              </div>
                              <input
                                type="text"
                                className="form__input linear"
                                defaultValue={20}
                                placeholder="Місце"
                              />
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form__item label">
                      <div className="form__item-label">
                        Частина відеоконтенту
                      </div>
                      <div className="form__input linear fi">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Назва частини"
                        />
                        <button className="form__button-add">
                          <div className="icon plus rounded" />
                        </button>
                      </div>
                      <div className="f-list r">
                        <div className="f-list__item full colorized mg">
                          <div className="f-list__content">
                            <div className="f-list__content-title">
                              Зоряні війни
                            </div>
                          </div>
                          <button className="button remove rounded">
                            <div className="icon close" />
                          </button>
                        </div>
                      </div>
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

export default VideoContentAddPage;
