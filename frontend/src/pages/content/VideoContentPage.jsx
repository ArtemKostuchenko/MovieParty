import React from "react";
import Background from "../../assets/background.jpg";
import Background1 from "../../assets/background-1.jpg";
import Background2 from "../../assets/background-1.jpg";
import Card from "../../assets/card.jpg";
import Profile2 from "../../assets/profile-2.png";
import VideoContent from "../../assets/video-content.png";
import Actor from "../../assets/actor.jpg";
import Director from "../../assets/director.webp";
import Avatar from "../../assets/avatar.png";

const VideoContentPage = () => {
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
                    <img
                      src={VideoContent}
                      alt="Зоряні війни: Епізод IX -Скайвокер. Сходження "
                    />
                  </div>
                </div>
                <div className="video-content__content">
                  <div className="video-content__info wrapper">
                    <div className="video-content__preview">
                      <div className="video-content__preview-image">
                        <img
                          src={Card}
                          alt="Зоряні війни: Епізод IX -Скайвокер. Сходження "
                        />
                      </div>
                      <div className="video-content__preview-actions">
                        <button className="button icon fill g8">
                          <div className="icon watch" />
                          Дивитися
                        </button>
                        <button className="button fill">
                          Створити кімнату
                        </button>
                        <button className="button transparent icon fill g8">
                          <div className="icon favorite" />В збережене
                        </button>
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
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">6.4</p>
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
                                  <div className="lists__place">(11 місце)</div>
                                </div>
                              </a>
                              <a href="#" className="link">
                                <div className="lists">
                                  <div className="lists__name">
                                    Найкращі фільми в жанрі фантастика 2019
                                  </div>
                                  <div className="lists__place">(15 місце)</div>
                                </div>
                              </a>
                              <a href="#" className="link">
                                <div className="lists">
                                  <div className="lists__name">
                                    Найкращі фільми в жанрі фентезі 2019
                                  </div>
                                  <div className="lists__place">(20 місце)</div>
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
        <div className="splitter" />
        <div className="container">
          <div className="wrapper">
            <div className="video-content__description">
              У цьому епічному завершенні саги про Скайуокера вцілілі члени
              Опору на чолі з генералом Леєю Органою (Керрі Фішер) стикаються зі
              своїм найбільшим викликом. Готуючись до фінальної сутички зі
              зловісним Першим Орденом, Рей (Дейзі Рідлі) продовжує свою
              подорож, щоб дізнатися правду про своє минуле і свій зв'язок з
              Силою. Разом зі своїми друзями Фінном (Джон Бойєга), По Деймероном
              (Оскар Айзек) і Чубаккою (Юнас Суотамо) Рей подорожує галактикою в
              пошуках відповідей, зустрічаючи на своєму шляху нових і старих
              ворогів. Тим часом зловісний Кайло Рен (Адам Драйвер) продовжує
              спокушати Рей приєднатися до нього на темній стороні, оскільки він
              прагне отримати абсолютну владу і контроль. У міру того, як битва
              між Опором і Першим Орденом загострюється, старі і нові герої
              повинні об'єднатися, щоб боротися за майбутнє галактики.
              Захоплюючий екшн, зворушливі моменти та приголомшлива розв'язка
              роблять "Зоряні Війни: Скайвокер. Сходження" обов'язковим до
              перегляду для шанувальників культової космічної опери.
            </div>
          </div>
        </div>
        <div className="container">
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
                        <div className="person__fullname">Джордж Лукас</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Джордж Лукас</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Джордж Лукас</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Джордж Лукас</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Керрі Фішшер</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Керрі Фішшер</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Керрі Фішшер</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Керрі Фішшер</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Керрі Фішшер</div>
                        <div className="person__original-fullname">
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
                        <div className="person__fullname">Керрі Фішшер</div>
                        <div className="person__original-fullname">
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
        </div>
        <div className="splitter" />
        <div className="container">
          <div className="wrapper">
            <div className="parts__wrapper">
              <div className="parts">
                <div className="parts__title">Зоряні війни - всі частини</div>
                <div className="parts__items">
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background}
                        alt="Зоряні війни: Епізод IV - Нова надія"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">01</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод IV - Нова надія
                      </div>
                      <div className="part__item-release-date">
                        25 Травня 1977
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.6</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background1}
                        alt=" Зоряні війни: Епізод V - Імперія завдає удару у відповідь"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">02</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод V - Імперія завдає удару у
                        відповідь
                      </div>
                      <div className="part__item-release-date">
                        20 Травня 1980
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.7</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background2}
                        alt="Зоряні війни: Епізод VI - Повернення джедая"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">03</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод VI - Повернення джедая
                      </div>
                      <div className="part__item-release-date">
                        25 Травня 1983
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.3</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background}
                        alt="Зоряні війни: Епізод IV - Нова надія"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">01</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод IV - Нова надія
                      </div>
                      <div className="part__item-release-date">
                        25 Травня 1977
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.6</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background1}
                        alt=" Зоряні війни: Епізод V - Імперія завдає удару у відповідь"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">02</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод V - Імперія завдає удару у
                        відповідь
                      </div>
                      <div className="part__item-release-date">
                        20 Травня 1980
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.7</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background2}
                        alt="Зоряні війни: Епізод VI - Повернення джедая"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">03</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод VI - Повернення джедая
                      </div>
                      <div className="part__item-release-date">
                        25 Травня 1983
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.3</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background}
                        alt="Зоряні війни: Епізод IV - Нова надія"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">01</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод IV - Нова надія
                      </div>
                      <div className="part__item-release-date">
                        25 Травня 1977
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.6</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background1}
                        alt=" Зоряні війни: Епізод V - Імперія завдає удару у відповідь"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">02</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод V - Імперія завдає удару у
                        відповідь
                      </div>
                      <div className="part__item-release-date">
                        20 Травня 1980
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.7</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
                  </div>
                  <div className="part__item">
                    <div className="part__item-filter" />
                    <div className="part__item-background">
                      <img
                        src={Background2}
                        alt="Зоряні війни: Епізод VI - Повернення джедая"
                      />
                    </div>
                    <div className="part__item-content">
                      <div className="part__item-number">03</div>
                      <div className="part__item-title">
                        Зоряні війни: Епізод VI - Повернення джедая
                      </div>
                      <div className="part__item-release-date">
                        25 Травня 1983
                      </div>
                      <div className="part__item-imdb">
                        <div className="IMDB">
                          <div className="icon imdb" />
                          <p className="IMDB__rating">8.3</p>
                        </div>
                      </div>
                      <div className="part__item-finished">
                        <div className="icon success" />
                      </div>
                    </div>
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
                    <img
                      src={Avatar}
                      alt="Qwerty"
                      className="profile__avatar"
                    />
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
                        <img
                          src={Avatar}
                          alt="Qwerty"
                          className="profile__avatar"
                        />
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
                        <img
                          src={Profile2}
                          alt="3amec"
                          className="profile__avatar"
                        />
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
