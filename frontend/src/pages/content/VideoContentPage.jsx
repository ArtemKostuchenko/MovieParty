import React, { useEffect } from "react";
import "./style.page.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetVideoContentByOriginTitleQuery } from "../../features/services/content/contentService";
import { formatDate } from "../../features/utils/functions";
import usePopup from "../../hooks/usePopup";
import useRating from "../../hooks/useRating";
import {
  Loader,
  NotFound,
  ReviewForm,
  ReviewItems,
  ScrollToTop,
  TrailerPopUp,
} from "../../components";
import RoomCreatePopUp from "../room/RoomCreatePopup";
import Favorite from "../../components/Favorites/Favorite";
import Rating from "../../components/Rating/Rating";
import useFill from "../../hooks/useFill";
import useUser from "../../hooks/useUser";
import useSubscription from "../../hooks/useSubscription";

const VideoContentPage = () => {
  const { originTitle: query } = useParams();
  const navigate = useNavigate();
  const { disableFill } = useFill();
  const { isAdd, editId, handleAddPopUp, handleEditPopUp } = usePopup();
  const { rateVideoContent, isLoadingRate } = useRating();
  const { user } = useUser();
  const { subscription, isLoading: isLoadingSubscription } = useSubscription();

  const { data, isLoading, refetch } = useGetVideoContentByOriginTitleQuery(
    query.replace(/-/g, " ")
  );

  useEffect(() => {
    if (!isLoading && data) {
      disableFill();
    }
  }, [isLoading, data]);

  if (isLoading || isLoadingSubscription) {
    return <Loader fixed />;
  }

  const content = data;

  if (!content) {
    return (
      <NotFound
        title="Відеоконтент не знайдено"
        description="Якщо впевнені, що він існує, то спробуйте пізніше"
      />
    );
  }

  const handleWatch = () => {
    const watchLink = `/${content.typeVideoContent.path}/${content.originTitle
      .toLowerCase()
      .replace(/\s/g, "-")}/watch`;
    navigate(watchLink);
  };

  const {
    _id: videoContentId,
    typeVideoContent,
    title,
    originTitle,
    previewURL,
    backgroundURL,
    trailerURL,
    IMDb,
    ratedByMe,
    rating,
    originCountries,
    actors,
    directors,
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

  const handleRateVideoContent = async (rate) => {
    if (!ratedByMe) {
      const rated = await rateVideoContent(videoContentId, rate);
      if (rated.success) {
        refetch();
      }
    }
  };

  return (
    <>
      <ScrollToTop animate />
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
                        {subscription?.plan?.active && (
                          <>
                            {!user.roomId && (
                              <button
                                className="button fill"
                                onClick={() => handleEditPopUp("create")}
                              >
                                Створити кімнату
                              </button>
                            )}
                            {user.roomId && (
                              <button
                                className="button fill"
                                onClick={() => navigate(`/room/${user.roomId}`)}
                              >
                                Моя кімната
                              </button>
                            )}
                          </>
                        )}
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
                          <Rating
                            rating={rating.averageRating || 0}
                            maxRating={5}
                            disabled={isLoadingRate || ratedByMe}
                            onChange={handleRateVideoContent}
                          />
                          <div className="rating__point">
                            {rating.averageRating || 0}
                          </div>
                          <div className="rating__votes">
                            <div className="icon group-users" />
                            <div className="rating__votes-amount">
                              {rating.voteCount} голосів
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
                                const linkGenre = `/${
                                  typeVideoContent.path
                                }/genre/${genre.originName.toLowerCase()}`;
                                return (
                                  <Link
                                    to={linkGenre}
                                    className="link outlined"
                                    key={genre._id}
                                  >
                                    {genre.name}
                                  </Link>
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

                                  const linkBest = `/${typeVideoContent.path}/best-list/${name}`;
                                  return (
                                    <Link
                                      to={linkBest}
                                      className="link"
                                      key={_id}
                                    >
                                      <div className="lists">
                                        <div className="lists__name">
                                          {name}
                                        </div>
                                        <div className="lists__place">
                                          ({placeInList} місце)
                                        </div>
                                      </div>
                                    </Link>
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
        <div className="container">
          <div className="wrapper">
            <div className="people__content">
              <div className="people">
                <div className="people__title">Режисери:</div>
                <div className="people__items">
                  {directors.map((director) => {
                    const {
                      _id,
                      firstName,
                      lastName,
                      firstNameEng,
                      lastNameEng,
                      age,
                      photoURL,
                      placeBirth,
                    } = director;

                    const directorLink = `/director/${firstNameEng.toLowerCase()}-${lastNameEng.toLowerCase()}`;

                    return (
                      <div className="person__item" key={_id}>
                        <div className="person">
                          <div className="person__photo">
                            <img
                              src={`${
                                import.meta.env.VITE_BACK_HOST
                              }/static/files/images/directors/${photoURL}`}
                              alt={`${firstName} ${lastName}`}
                            />
                          </div>
                          <div className="person__info">
                            <Link
                              to={directorLink}
                              className="person__full-name"
                            >
                              {firstName} {lastName}
                            </Link>
                            <div className="person__original-full-name">
                              {firstNameEng} {lastNameEng}
                            </div>
                            <div className="person__age">{age - 1} років</div>
                            <div className="person__location">
                              <div className="person__location-icon">
                                <div className="icon location" />
                              </div>
                              {placeBirth}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {directors.length > 6 && (
                  <div className="people__more">
                    <button className="button icon g8">
                      <div className="icon add" />
                      Показати більше
                    </button>
                  </div>
                )}
              </div>
              <div className="people">
                <div className="people__title">Актори:</div>
                <div className="people__items">
                  {actors.map((actor) => {
                    const {
                      _id,
                      firstName,
                      lastName,
                      firstNameEng,
                      lastNameEng,
                      age,
                      photoURL,
                      placeBirth,
                    } = actor;

                    const actorLink = `/actor/${firstNameEng.toLowerCase()}-${lastNameEng.toLowerCase()}`;

                    return (
                      <div className="person__item" key={_id}>
                        <div className="person">
                          <div className="person__photo">
                            <img
                              src={`${
                                import.meta.env.VITE_BACK_HOST
                              }/static/files/images/actors/${photoURL}`}
                              alt={`${firstName} ${lastName}`}
                            />
                          </div>
                          <div className="person__info">
                            <Link to={actorLink} className="person__full-name">
                              {firstName} {lastName}
                            </Link>
                            <div className="person__original-full-name">
                              {firstNameEng} {lastNameEng}
                            </div>
                            <div className="person__age">{age - 1} років</div>
                            <div className="person__location">
                              <div className="person__location-icon">
                                <div className="icon location" />
                              </div>
                              {placeBirth}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {actors.length > 6 && (
                  <div className="people__more">
                    <button className="button icon g8">
                      <div className="icon add" />
                      Показати більше
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="splitter" />
        <div className="container">
          <div className="wrapper">
            <div className="parts__wrapper">
              <div className="parts">
                <div className="parts__title">{part.name} - всі частини</div>
                <div className="overflow-content">
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

                      const videoContentLink = `/${
                        typeVideoContent.path
                      }/${originTitle.toLowerCase().replace(/\s/g, "-")}`;

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
                                <p className="IMDb__rating">
                                  {IMDb.toFixed(1)}
                                </p>
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
              <div className="reviews__title">Відгуки</div>
              <ReviewForm videoContentId={videoContentId} />
              <ReviewItems videoContentId={videoContentId} />
            </div>
          </div>
        </div>
        <div className="splitter" />
      </div>
      {editId && <RoomCreatePopUp videoContentId={videoContentId} />}
    </>
  );
};

export default VideoContentPage;
