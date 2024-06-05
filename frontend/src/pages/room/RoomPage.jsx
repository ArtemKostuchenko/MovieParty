import React from "react";
import "./style.page.scss";
import { useParams } from "react-router-dom";
import { useGetRoomByIdQuery } from "../../features/services/rooms/roomsService";
import useFill from "../../hooks/useFill";
import { Loader, NotFound } from "../../components";

const RoomPage = () => {
  const { id: roomId } = useParams();
  const {} = useFill();

  const { data, isLoading } = useGetRoomByIdQuery(roomId);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <NotFound title="Кімнату не знайдено" image="room" />;
  }

  console.log(data);

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="room">
            <div className="room__grid">
              <div className="room__player">
                <img src="../images/player.png" alt="Player" />
              </div>
              <div className="room__chat">
                <div className="chat">
                  <div className="chat__bar">
                    <button className="chat__button">
                      <div className="icon c-arrow" />
                    </button>
                    <div className="chat__title">Чат</div>
                    <button className="chat__button">
                      <div className="icon c-users" />
                    </button>
                  </div>
                  <div className="chat__messages">
                    <div className="chat__message">
                      <div className="chat__message-sender">
                        <div className="chat__message-avatar">
                          <img src="../images/avatar.png" alt="Qwerty" />
                        </div>
                        <div className="chat__message-nickname">Qwerty</div>
                      </div>
                      <div className="chat__message-content">
                        Відчути атмосферу історії, яка переносить вас у
                        постапокаліптичний світ, де кожне рішення може визначити
                        виживання
                      </div>
                    </div>
                    <div className="chat__message">
                      <div className="chat__message-sender">
                        <div className="chat__message-avatar">
                          <img src="../images/avatar.png" alt="Qwerty" />
                        </div>
                        <div className="chat__message-nickname">Qwerty</div>
                      </div>
                      <div className="chat__message-content">
                        Відчути атмосферу історії, яка переносить вас у
                        постапокаліптичний світ, де кожне рішення може визначити
                        виживання
                      </div>
                    </div>
                    <div className="chat__message">
                      <div className="chat__message-sender">
                        <div className="chat__message-avatar">
                          <img src="../images/avatar.png" alt="Qwerty" />
                        </div>
                        <div className="chat__message-nickname">Qwerty</div>
                      </div>
                      <div className="chat__message-content">
                        Відчути атмосферу історії, яка переносить вас у
                        постапокаліптичний світ, де кожне рішення може визначити
                        виживання
                      </div>
                    </div>
                    <div className="chat__message">
                      <div className="chat__message-sender">
                        <div className="chat__message-avatar">
                          <img src="../images/avatar.png" alt="Qwerty" />
                        </div>
                        <div className="chat__message-nickname">Qwerty</div>
                      </div>
                      <div className="chat__message-content">
                        Відчути атмосферу історії, яка переносить вас у
                        постапокаліптичний світ, де кожне рішення може визначити
                        виживання
                      </div>
                    </div>
                    <div className="chat__message">
                      <div className="chat__message-sender">
                        <div className="chat__message-avatar">
                          <img src="../images/avatar.png" alt="Qwerty" />
                        </div>
                        <div className="chat__message-nickname">Qwerty</div>
                      </div>
                      <div className="chat__message-content">
                        Відчути атмосферу історії, яка переносить вас у
                        постапокаліптичний світ, де кожне рішення може визначити
                        виживання
                      </div>
                    </div>
                    <div className="chat__message">
                      <div className="chat__message-sender">
                        <div className="chat__message-avatar">
                          <img src="../images/avatar.png" alt="Qwerty" />
                        </div>
                        <div className="chat__message-nickname">Qwerty</div>
                      </div>
                      <div className="chat__message-content">
                        Відчути атмосферу історії, яка переносить вас у
                        постапокаліптичний світ, де кожне рішення може визначити
                        виживання
                      </div>
                    </div>
                  </div>
                  <div className="chat__send-form">
                    <div className="chat__sender">
                      <div className="chat__sender-avatar">
                        <img src="../images/avatar.png" alt="Qwerty" />
                      </div>
                      <div className="chat__sender-nickname">Qwerty</div>
                    </div>
                    <div className="chat__form">
                      <input type="text" className="form__input linear" />
                      <button className="chat__button" type="submit">
                        <div className="icon send" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="room__info-bar">
                <div className="room__owner">
                  <div className="room__owner-avatar">
                    <img src="../images/avatar.png" alt="Qwerty" />
                  </div>
                  <div className="room__owner-info">
                    <div className="room__owner-nickname">Qwerty</div>
                    <div className="room__title">Дивимось крутий фільм</div>
                  </div>
                </div>
                <div className="room__details">
                  <div className="room__details-live">
                    <div className="icon live" />
                    <div className="room__details-users">5</div>
                  </div>
                  <button className="room__details-action">
                    <div className="icon copy" />
                  </button>
                  <button className="room__details-action">
                    <div className="icon settings" />
                  </button>
                </div>
              </div>
              <div className="room__info">
                <div className="room__content">
                  <div className="room__content-description">
                    У цьому епічному завершенні саги про Скайуокера вцілілі
                    члени Опору на чолі з генералом Леєю Органою (Керрі Фішер)
                    стикаються зі своїм найбільшим викликом. Готуючись до
                    фінальної сутички зі зловісним Першим Орденом, Рей (Дейзі
                    Рідлі) продовжує свою подорож, щоб дізнатися правду про своє
                    минуле і свій зв'язок з Силою. Разом зі своїми друзями
                    Фінном (Джон Бойєга), По Деймероном (Оскар Айзек) і Чубаккою
                    (Юнас Суотамо) Рей подорожує галактикою в пошуках
                    відповідей, зустрічаючи на своєму шляху нових і старих
                    ворогів. Тим часом зловісний Кайло Рен (Адам Драйвер)
                    продовжує спокушати Рей приєднатися до нього на темній
                    стороні, оскільки він прагне отримати абсолютну владу і
                    контроль. У міру того, як битва між Опором і Першим Орденом
                    загострюється, старі і нові герої повинні об'єднатися, щоб
                    боротися за майбутнє галактики. Захоплюючий екшн, зворушливі
                    моменти та приголомшлива розв'язка роблять "Зоряні Війни:
                    Скайвокер. Сходження" обов'язковим до перегляду для
                    шанувальників культової космічної опери.
                  </div>
                  <div className="room__content-info">
                    <div className="room__content-title">
                      Обраний контент для перегляду:
                    </div>
                    <div className="video-content__content ng">
                      <div className="video-content__container wrapper">
                        <div className="video-content__preview">
                          <div className="video-content__preview-image">
                            <img
                              src="../images/card.jpg"
                              alt="Зоряні війни: Епізод IX -Скайвокер. Сходження "
                            />
                          </div>
                        </div>
                        <div className="video-content__details">
                          <div className="video-content__title-container">
                            <div className="video-content__titles">
                              <div className="video-content__title">
                                Зоряні війни: Епізод IX -Скайвокер. Сходження
                              </div>
                              <div className="video-content__original-title">
                                Star Wars: Episode IX - The Rise of Skywalker
                              </div>
                            </div>
                            <div className="IMDb">
                              <div className="icon IMDb" />
                              <p className="IMDb__rating">6.4</p>
                            </div>
                          </div>
                          <div className="video-content__rating">
                            <div className="rating">
                              <div className="rating__items">
                                <div className="rating__item">
                                  <div className="icon star" />
                                </div>
                                <div className="rating__item">
                                  <div className="icon star" />
                                </div>
                                <div className="rating__item">
                                  <div className="icon star" />
                                </div>
                                <div className="rating__item">
                                  <div className="icon star" />
                                </div>
                                <div className="rating__item">
                                  <div className="icon star outline" />
                                </div>
                              </div>
                              <div className="rating__point">4.0</div>
                              <div className="rating__votes">
                                <div className="icon group-users" />
                                <div className="rating__votes-amount">
                                  22 голосів
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="video-content__information">
                            <div className="video-content__information-item">
                              <div className="video-content__information-title">
                                Країна:
                              </div>
                              <div className="video-content__information-content">
                                <div className="video-content__information-text">
                                  CША
                                </div>
                              </div>
                            </div>
                            <div className="video-content__information-item">
                              <div className="video-content__information-title">
                                Тривалість:
                              </div>
                              <div className="video-content__information-content">
                                <div className="video-content__information-text">
                                  2 год 21 хв
                                </div>
                              </div>
                            </div>
                            <div className="video-content__information-item">
                              <div className="video-content__information-title">
                                Дата релізу:
                              </div>
                              <div className="video-content__information-content">
                                <div className="video-content__information-text">
                                  18 грудня 2019 рік
                                </div>
                              </div>
                            </div>
                            <div className="video-content__information-item start genres">
                              <div className="video-content__information-title">
                                Жанр:
                              </div>
                              <div className="video-content__information-content">
                                <div className="link__items">
                                  <a href="#" className="link outlined">
                                    Пригоди
                                  </a>
                                  <a href="#" className="link outlined">
                                    Фентезі
                                  </a>
                                  <a href="#" className="link outlined">
                                    Екшен
                                  </a>
                                  <a href="#" className="link outlined">
                                    Бойовик
                                  </a>
                                  <a href="#" className="link outlined">
                                    Фантастика
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="video-content__information-item start v-lists">
                              <div className="video-content__information-title">
                                Входить до:
                              </div>
                              <div className="video-content__information-content">
                                <div className="link__items col">
                                  <a href="#" className="link">
                                    <div className="lists">
                                      <div className="lists__name">
                                        Найкращі серіали в жанрі спорт
                                      </div>
                                      <div className="lists__place">
                                        (11 місце)
                                      </div>
                                    </div>
                                  </a>
                                  <a href="#" className="link">
                                    <div className="lists">
                                      <div className="lists__name">
                                        Найкращі фільми в жанрі фантастика 2019
                                      </div>
                                      <div className="lists__place">
                                        (15 місце)
                                      </div>
                                    </div>
                                  </a>
                                  <a href="#" className="link">
                                    <div className="lists">
                                      <div className="lists__name">
                                        Найкращі фільми в жанрі фентезі 2019
                                      </div>
                                      <div className="lists__place">
                                        (20 місце)
                                      </div>
                                    </div>
                                  </a>
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
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default RoomPage;
