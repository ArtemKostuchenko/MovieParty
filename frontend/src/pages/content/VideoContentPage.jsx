import React from "react";
import { useGetVideoContentByOriginTitleQuery } from "../../features/services/content/contentService";
import { formatDate } from "../../features/utils/functions";
import { useParams, Link, useNavigate } from "react-router-dom";
import Profile2 from "../../assets/profile-2.png";
import Avatar from "../../assets/avatar.png";
import "./style.page.scss";
import usePopup from "../../hooks/usePopup";
import { TrailerPopUp } from "../../components";
import Favorite from "../../components/Favorites/Favorite";

const VideoContentPage = () => {
  const { originTitle: query } = useParams();
  const navigate = useNavigate();
  const { isAdd, handleAddPopUp } = usePopup();

  const { data, isLoading, error } = useGetVideoContentByOriginTitleQuery(
    query.replace(/-/g, " ")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const content = data;

  if (!content) {
    return <div>Content not found</div>;
  }

  const handleWatch = () => {
    const watchLink = `/${content.typeVideoContent}/${content.originTitle
      .toLowerCase()
      .replace(/\s/g, "-")}/watch`;
    navigate(watchLink);
  };

  const {
    _id: videoContentId,
    title,
    originTitle,
    previewURL,
    backgroundURL,
    trailerURL,
    IMDb,
    rating,
    originCountries,
    duration,
    releaseDate,
    genres,
    lists,
    description,
    part,
  } = content;

  const contentPreviewURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/content/${previewURL}`;

  const contentBackgroundURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/content/${backgroundURL}`;

  return (
    <>
      <div className="container cnt-mn overlay-cnt-mn">
        <div className="container">
          <div className="grid">
            <div className="grid__content">
              <div className="video-content">
                <div className="video-content__image">
                  <div className="filter" />
                  <div className="image">
                    <img src={contentBackgroundURL} alt={title} />
                  </div>
                </div>
                <div className="video-content__content">
                  <div className="video-content__container wrapper">
                    <div className="video-content__preview">
                      <div className="video-content__preview-image">
                        <img src={contentPreviewURL} alt={title} />
                      </div>
                      <div className="video-content__preview-actions">
                        <button
                          className="button icon fill g8 t-icon"
                          onClick={handleWatch}
                        >
                          <div className="icon watch" />
                          Дивитися
                        </button>
                        <button className="button fill">
                          Створити кімнату
                        </button>
                        <Favorite videoContentId={videoContentId} />
                        <button
                          className="button light outline fill"
                          onClick={() => handleAddPopUp()}
                        >
                          Трейлер
                        </button>
                      </div>
                    </div>
                    <div className="video-content__details">
                      <div className="video-content__title-container">
                        <div className="video-content__titles">
                          <div className="video-content__title">{title}</div>
                          <div className="video-content__original-title">
                            {originTitle}
                          </div>
                        </div>
                        <div className="IMDb">
                          <div className="icon IMDb" />
                          <p className="IMDb__rating">{IMDb.toFixed(1)}</p>
                        </div>
                      </div>
                      <div className="video-content__rating">
                        <div className="rating">
                          <div className="rating__items">
                            <div className="rating__item">
                              <div className="icon star outline" />
                            </div>
                            <div className="rating__item">
                              <div className="icon star outline" />
                            </div>
                            <div className="rating__item">
                              <div className="icon star outline" />
                            </div>
                            <div className="rating__item">
                              <div className="icon star outline" />
                            </div>
                            <div className="rating__item">
                              <div className="icon star outline" />
                            </div>
                          </div>
                          <div className="rating__point">{rating}</div>
                          <div className="rating__votes">
                            <div className="icon group-users" />
                            <div className="rating__votes-amount">
                              0 голосів
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="video-content__information">
                        <div className="video-content__information-item">
                          <div className="video-content__information-title">
                            Країна:
                          </div>
                          <div className="video-content__information-content flex r g5 center-h">
                            {originCountries.map((country, index) => {
                              return (
                                <div
                                  className="video-content__information-text"
                                  key={country._id}
                                >
                                  {country.name}
                                  {index !== originCountries.length - 1
                                    ? ", "
                                    : ""}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="video-content__information-item">
                          <div className="video-content__information-title">
                            Тривалість:
                          </div>
                          <div className="video-content__information-content">
                            <div className="video-content__information-text">
                              {duration}
                            </div>
                          </div>
                        </div>
                        <div className="video-content__information-item">
                          <div className="video-content__information-title">
                            Дата релізу:
                          </div>
                          <div className="video-content__information-content">
                            <div className="video-content__information-text">
                              {formatDate(releaseDate)}
                            </div>
                          </div>
                        </div>
                        <div className="video-content__information-item start genres">
                          <div className="video-content__information-title">
                            Жанр:
                          </div>
                          <div className="video-content__information-content">
                            <div className="link__items">
                              {genres.map((genre) => {
                                return (
                                  <a
                                    href="#"
                                    className="link outlined"
                                    key={genre._id}
                                  >
                                    {genre.name}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        {Boolean(lists.length) && (
                          <div className="video-content__information-item start v-lists">
                            <div className="video-content__information-title">
                              Входить до:
                            </div>
                            <div className="video-content__information-content">
                              <div className="link__items col">
                                {lists.map((item) => {
                                  const {
                                    list: { _id, name },
                                    placeInList,
                                  } = item;
                                  return (
                                    <a href="#" className="link" key={_id}>
                                      <div className="lists">
                                        <div className="lists__name">
                                          {name}
                                        </div>
                                        <div className="lists__place">
                                          ({placeInList} місце)
                                        </div>
                                      </div>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isAdd && <TrailerPopUp trailer={trailerURL} />}
        <div className="splitter" />
        <div className="container">
          <div className="wrapper">
            <div className="video-content__description">{description}</div>
          </div>
        </div>
        {/* <div className="container">
          <div className="wrapper">
            <div className="people__content">
              <div className="people">
                <div className="people__title">Режисери:</div>
                <div className="people__items">
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Director} alt="Джордж Лукас" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Джордж Лукас</div>
                        <div className="person__original-full-name">
                          George Lucas
                        </div>
                        <div className="person__age">79 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Модесто, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Director} alt="Джордж Лукас" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Джордж Лукас</div>
                        <div className="person__original-full-name">
                          George Lucas
                        </div>
                        <div className="person__age">79 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Модесто, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Director} alt="Джордж Лукас" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Джордж Лукас</div>
                        <div className="person__original-full-name">
                          George Lucas
                        </div>
                        <div className="person__age">79 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Модесто, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Director} alt="Джордж Лукас" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Джордж Лукас</div>
                        <div className="person__original-full-name">
                          George Lucas
                        </div>
                        <div className="person__age">79 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Модесто, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="people">
                <div className="people__title">Актори:</div>
                <div className="people__items">
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Actor} alt="Керрі Фішшер" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Керрі Фішшер</div>
                        <div className="person__original-full-name">
                          Carrie&nbsp;Fisher
                        </div>
                        <div className="person__age">60 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Лос-Анджелес, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Actor} alt="Керрі Фішшер" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Керрі Фішшер</div>
                        <div className="person__original-full-name">
                          Carrie&nbsp;Fisher
                        </div>
                        <div className="person__age">60 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Лос-Анджелес, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Actor} alt="Керрі Фішшер" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Керрі Фішшер</div>
                        <div className="person__original-full-name">
                          Carrie&nbsp;Fisher
                        </div>
                        <div className="person__age">60 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Лос-Анджелес, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Actor} alt="Керрі Фішшер" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Керрі Фішшер</div>
                        <div className="person__original-full-name">
                          Carrie&nbsp;Fisher
                        </div>
                        <div className="person__age">60 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Лос-Анджелес, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Actor} alt="Керрі Фішшер" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Керрі Фішшер</div>
                        <div className="person__original-full-name">
                          Carrie&nbsp;Fisher
                        </div>
                        <div className="person__age">60 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Лос-Анджелес, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="person__item">
                    <div className="person">
                      <div className="person__photo">
                        <img src={Actor} alt="Керрі Фішшер" />
                      </div>
                      <div className="person__info">
                        <div className="person__full-name">Керрі Фішшер</div>
                        <div className="person__original-full-name">
                          Carrie&nbsp;Fisher
                        </div>
                        <div className="person__age">60 років</div>
                        <div className="person__location">
                          <div className="person__location-icon">
                            <div className="icon location" />
                          </div>
                          Лос-Анджелес, Каліфорнія, США
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="people__more">
                  <button className="button icon g8">
                    <div className="icon add" />
                    Показати більше
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="splitter" /> */}
        <div className="container">
          <div className="wrapper">
            <div className="parts__wrapper">
              <div className="parts">
                <div className="parts__title">{part.name} - всі частини</div>
                <div class="overflow-content">
                  <div className="parts__items">
                    {part.contents.map((content, index) => {
                      const {
                        _id,
                        typeVideoContent,
                        title,
                        originTitle,
                        IMDb,
                        backgroundURL,
                        releaseDate,
                      } = content;

                      const videoContentLink = `/${typeVideoContent}/${originTitle
                        .toLowerCase()
                        .replace(/\s/g, "-")}`;

                      return (
                        <Link
                          className={`part__item${
                            videoContentId === _id ? " selected" : ""
                          }`}
                          key={_id}
                          to={videoContentLink}
                        >
                          <div className="part__item-filter" />
                          <div className="part__item-background">
                            <img
                              src={`${
                                import.meta.env.VITE_BACK_HOST
                              }/static/files/images/content/${backgroundURL}`}
                              alt={title}
                            />
                          </div>
                          <div className="part__item-content">
                            <div className="part__item-number">
                              0{index + 1}
                            </div>
                            <div className="part__item-title">{title}</div>
                            <div className="part__item-release-date">
                              {formatDate(releaseDate)}
                            </div>
                            <div className="part__item-IMDb">
                              <div className="IMDb">
                                <div className="icon IMDb" />
                                <p className="IMDb__rating">{IMDb}</p>
                              </div>
                            </div>
                            <div className="part__item-finished">
                              <div className="icon success" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="splitter" />
        <div className="container">
          <div className="wrapper">
            <div className="reviews">
              <div className="reviews__title">Відгуки (2)</div>
              <div className="reviews__container">
                <div className="review__owner">
                  <div className="review__profile">
                    <div className="profile profile__avatar">
                      <img src={Avatar} alt="Qwerty" />
                    </div>
                    <h2 className="profile__name">Qwerty</h2>
                  </div>
                </div>
                <div className="reviews__form">
                  <textarea
                    name="review"
                    id="review"
                    placeholder="Ваш відгук"
                    defaultValue={""}
                  />
                  <button className="button">Додати відгук</button>
                </div>
              </div>
              <div className="reviews__items">
                <div className="reviews__item">
                  <div className="review owner">
                    <div className="review__owner">
                      <div className="review__profile">
                        <div className="profile profile__avatar">
                          <img src={Avatar} alt="Qwerty" />
                        </div>
                        <h2 className="profile__name">Qwerty</h2>
                      </div>
                      <span className="review__splitter circle" />
                      <div className="review__date">2 роки тому</div>
                    </div>
                    <div className="review__comment">
                      Є фільми які були надзвичайно популярні у свій час і за
                      рахунок своєї популярності знімалися інші частини але вони
                      не несуть вже цінності так як використовують успіх
                      попередніх частини. Ось це саме той випадок.
                    </div>
                    <div className="review__rating">
                      <div className="review__likes">
                        <button className="button icon i t">
                          <div className="icon like" />
                        </button>
                        <div className="review__rating-count">4</div>
                      </div>
                      <div className="review__dislikes">
                        <button className="button icon i t">
                          <div className="icon dislike" />
                        </button>
                        <div className="review__rating-count">0</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reviews__item">
                  <div className="review">
                    <div className="review__owner">
                      <div className="review__profile">
                        <div className="profile profile__avatar">
                          <img src={Profile2} alt="3amec" />
                        </div>
                        <h2 className="profile__name">3amec</h2>
                      </div>
                      <span className="review__splitter circle" />
                      <div className="review__date">2 роки тому</div>
                    </div>
                    <div className="review__comment">
                      Генерал Хакс-принципово один з найкращих персонажів із
                      гарною мотивацією. Все, що нам показали- як він став
                      шпигуном та як його по тупому викрили. Я вже мовчу про те,
                      що він в 7 епізоді вбив понад 155 мільярдів людей, а в
                      цьому він-шпигун руху опору. Це називається викинути
                      персонажа на смітник.
                    </div>
                    <div className="review__rating">
                      <div className="review__likes">
                        <button className="button icon i t">
                          <div className="icon like" />
                        </button>
                        <div className="review__rating-count">2</div>
                      </div>
                      <div className="review__dislikes">
                        <button className="button icon i t">
                          <div className="icon dislike" />
                        </button>
                        <div className="review__rating-count">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="splitter" />
      </div>
    </>
  );
};

export default VideoContentPage;
