import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "./style.page.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageSchema } from "../../features/validations";
import { Link, useParams } from "react-router-dom";
import { useGetRoomByIdQuery } from "../../features/services/rooms/roomsService";
import useFill from "../../hooks/useFill";
import {
  Avatar,
  Loader,
  MessageItems,
  NotFound,
  VideoPlayer,
} from "../../components";
import Rating from "../../components/Rating/Rating";
import Favorite from "../../components/Favorites/Favorite";
import { formatDate } from "../../features/utils/functions";
import useUser from "../../hooks/useUser";
import useRoom from "../../hooks/useRoom";
import useSocket from "../../hooks/useSocket";
import useVideoPlayer from "../../hooks/useVideoPlayer";

const RoomPage = () => {
  const { id: roomId } = useParams();
  const {} = useFill();
  const { user } = useUser();
  const { isPlaying, time, handlePlay, handlePause } = useVideoPlayer();
  const { isChatOpen, toggleChat } = useRoom();
  const { socket, connect, disconnect } = useSocket();
  const [messages, setMessages] = useState([]);
  const [seek, setSeek] = useState(0);
  const [roomOwner, setRoomOwner] = useState(null);
  const isMounted = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(MessageSchema),
  });

  const { data, isLoading, refetch } = useGetRoomByIdQuery(roomId);

  useEffect(() => {
    if (!isLoading && data) {
      socket.auth.user._id = user._id;
      connect();
      socket.emit("join", roomId);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    if (!roomOwner) {
      return;
    }

    if (socket) {
      socket.on("update_live", () => {
        refetch();
      });
      socket.on("receive_messages", (data) => {
        setMessages(data);
      });

      socket.on("seek", (seek) => {
        setSeek(seek);
      });

      socket.on("play", (play) => {
        if (play) {
          handlePlay();
        } else {
          handlePause();
        }
      });

      socket.on("time", (time) => {
        if (roomOwner._id !== user._id) {
          setSeek(time);
        }
      });
    }
  }, [socket, roomOwner]);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    if (!roomOwner) {
      return;
    }

    if (user._id !== roomOwner._id) return;

    socket.emit("play", roomId, isPlaying);
    socket.emit("time", roomId, time);
  }, [isPlaying, roomOwner]);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    if (!roomOwner) {
      return;
    }

    if (user._id !== roomOwner._id) return;

    socket.emit("time", roomId, time);
  }, [time, roomOwner]);

  useEffect(() => {
    if (data?.ownerUser) {
      setRoomOwner(data.ownerUser);
    }
  }, [data]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    return () => {
      disconnect();
    };
  }, []);

  const onSubmitMessage = async (data) => {
    socket.emit("send_message", roomId, { message: data.message });
    reset();
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <NotFound title="Кімнату не знайдено" image="room" />;
  }

  const { title: roomTitle, videoContent, ownerUser, users, inviteCode } = data;

  const {
    _id: videoContentId,
    title,
    originTitle,
    previewURL,
    IMDb,
    rating,
    description,
    originCountries,
    duration,
    releaseDate,
    genres,
    typeVideoContent,
    lists,
    soundTracks,
    seasons,
  } = videoContent;

  const contentPreviewURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/content/${previewURL}`;

  const inviteLink = `${
    import.meta.env.VITE_FRONT_HOST
  }/room/invite?code=${inviteCode}`;

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="room">
            <div className="room__grid">
              <div className={`room__player${!isChatOpen ? " full" : ""}`}>
                <VideoPlayer
                  controls={{
                    seek: ownerUser._id === user._id,
                    play: ownerUser._id === user._id,
                    pInp: ownerUser._id === user._id,
                    settings: {
                      speed: ownerUser._id === user._id,
                    },
                  }}
                  autoplay={ownerUser._id !== user._id}
                  seek={seek}
                  soundTracks={soundTracks}
                  seasons={seasons}
                  handleSeekChange={(seek) => socket.emit("seek", roomId, seek)}
                />
                <div className="room__player-buttons">
                  {ownerUser._id !== user._id && (
                    <button
                      className="room__player-button-sync"
                      onClick={() => socket.emit("sync", roomId)}
                    >
                      <div className="icon sync" />
                    </button>
                  )}
                  {!isChatOpen && (
                    <button
                      className="room__player-button-chat"
                      onClick={toggleChat}
                    >
                      <div className="icon c-arrow" />
                    </button>
                  )}
                </div>
              </div>
              {isChatOpen && (
                <div className="room__chat">
                  <div className="chat">
                    <div className="chat__bar">
                      <button className="chat__button" onClick={toggleChat}>
                        <div className="icon c-arrow" />
                      </button>
                      <div className="chat__title">Чат</div>
                      <button className="chat__button">
                        <div className="icon c-users" />
                      </button>
                    </div>
                    <MessageItems messages={messages} />
                    <div className="chat__send-form">
                      <div className="chat__sender">
                        <div className="chat__sender-avatar">
                          <Avatar
                            photoURL={user.avatarURL}
                            nickname={user.nickname}
                            avatarColor={user.avatarColor}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="chat__sender-nickname">
                          {user.nickname}
                        </div>
                      </div>
                      <form
                        className="chat__form"
                        onSubmit={handleSubmit(onSubmitMessage)}
                      >
                        <input
                          type="text"
                          {...register("message")}
                          className="form__input linear"
                        />
                        <button
                          className="chat__button"
                          type="submit"
                          disabled={!isValid || !isDirty}
                        >
                          <div className="icon send" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              <div className="room__info-bar">
                <div className="room__owner">
                  <div className="room__owner-avatar">
                    <Avatar
                      photoURL={ownerUser.avatarURL}
                      nickname={ownerUser.nickname}
                      avatarColor={ownerUser.avatarColor}
                      width={75}
                      height={75}
                    />
                  </div>
                  <div className="room__owner-info">
                    <div className="room__owner-nickname">
                      {ownerUser.nickname}
                    </div>
                    <div className="room__title">{roomTitle}</div>
                  </div>
                </div>
                <div className="room__details">
                  <div className="room__details-live">
                    <div className="icon live" />
                    <div className="room__details-users">{users.length}</div>
                  </div>
                  <CopyToClipboard
                    onCopy={() =>
                      toast.success("Запрошувальне посилання скопійовано")
                    }
                    text={inviteLink}
                  >
                    <button className="room__details-action">
                      <div className="icon copy" />
                    </button>
                  </CopyToClipboard>
                  <button className="room__details-action">
                    <div className="icon settings" />
                  </button>
                </div>
              </div>
              <div className="room__info">
                <div className="room__content">
                  <div className="room__content-description">{description}</div>
                  <div className="room__content-info">
                    <div className="room__content-title">
                      Обраний контент для перегляду:
                    </div>
                    <div className="video-content__content ng">
                      <div className="video-content__container wrapper">
                        <div className="video-content__preview">
                          <div className="video-content__preview-image">
                            <img src={contentPreviewURL} alt={title} />
                          </div>
                          <div className="video-content__preview-actions">
                            <Favorite videoContentId={videoContentId} />
                          </div>
                        </div>
                        <div className="video-content__details">
                          <div className="video-content__title-container">
                            <div className="video-content__titles">
                              <div className="video-content__title">
                                {title}
                              </div>
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
                                disabled={true}
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
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default RoomPage;
