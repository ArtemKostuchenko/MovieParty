import React from "react";
import MainBackground from "../../assets/main-background.png";
import WatchAnyWhere from "../../assets/watch-anywhere.png";
import "./style.css";
import { FAQItems } from "../../components";

const HomePage = () => {
  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <section className="welcome__service">
        <div className="container information__overlay">
          <div className="wrapper small max-height">
            <div className="information__main">
              <h1 className="information__title">
                Спільний перегляд фільмів, серіалів, мультфільмів та іншого
                контенту без обмежень
              </h1>
              <p className="information__description">
                Дивіться будь де. Підписку можна скасувати в будь-який час.
              </p>
              <p className="information__motivation">
                Готові до <span className="motivation__main">Party</span>
                <span className="motivation__alternative">Вечеріки</span> з
                друзями? Натисніть оформити підписку.
              </p>
              <button className="button primary information__subscribe">
                Оформити підписку
              </button>
            </div>
          </div>
        </div>
        <div className="background__main background__overlay">
          <img src={MainBackground} alt="MainImage" />
        </div>
      </section>
      <div className="splitter"></div>
      <div className="container">
        <div className="wrapper">
          <section className="information__content">
            <div className="wrapper small">
              <h1 className="information__content-title">
                Cвіт незабутніх емоцій кіно
              </h1>
              <p className="information__content-description">
                Ласкаво просимо до нашого веб-сервісу, де світ кіно та
                телесеріалів стає вашим особистим плейлистом. З нами ви
                отримуєте необмежений доступ до величезної бібліотеки
                різноманітних фільмів та серіалів, яка поєднує у собі всі жанри,
                епохи та смаки глядачів
              </p>
            </div>
            <div className="benefits">
              <div className="benefits__items">
                <div className="benefit__item">
                  <div className="benefit__circle">
                    <div className="benefit__icon">
                      <div className="icon library"></div>
                    </div>
                  </div>
                  <div className="benefit__title">Величезна бібліотека</div>
                  <div className="benefit__description">
                    Необмежений доступ до величезної бібліотеки різноманітних
                    фільмів та серіалів, яка поєднує у собі всі жанри, епохи та
                    смаки глядачів.
                  </div>
                </div>
                <div className="benefit__item">
                  <div className="benefit__circle">
                    <div className="benefit__icon">
                      <div className="icon convenient-use"></div>
                    </div>
                  </div>
                  <div className="benefit__title">Зручність використання</div>
                  <div className="benefit__description">
                    Зручний інтерфейс нашого веб-сервісу дозволяє легко шукати,
                    зберігати та ділитися враженнями про переглянуте.
                  </div>
                </div>
                <div className="benefit__item">
                  <div className="benefit__circle">
                    <div className="benefit__icon">
                      <div className="icon watch-together"></div>
                    </div>
                  </div>
                  <div className="benefit__title">Спільний перегляд</div>
                  <div className="benefit__description">
                    Разом з друзями або новими знайомими ви можете
                    насолоджуватися фільмами та серіалами в реальному часі,
                    обговорюючи їх із захопленням.
                  </div>
                </div>
                <div className="benefit__item">
                  <div className="benefit__circle">
                    <div className="benefit__icon">
                      <div className="icon library"></div>
                    </div>
                  </div>
                  <div className="benefit__title">Постійні оновлення</div>
                  <div className="benefit__description">
                    Ми постійно поповнюємо нашу бібліотеку фільмів та іншого
                    контенту.Насолоджуйтесь свіжими випусками та ексклюзивними
                    релізами.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="splitter"></div>
      <div className="container">
        <div className="wrapper">
          <section className="watch__anywhere">
            <div className="watch__anywhere-item">
              <h1 className="watch__anywhere-title">Дивіться будь-де</h1>
              <p className="watch__anywhere-description">
                Дивіться фільми, серіали, мультфільми без обмежень на смартфоні,
                планшеті, ноутбуці й телевізорі.
              </p>
            </div>
            <div className="watch__anywhere-image">
              <img src={WatchAnyWhere} alt="Дивіться будь-де" />
            </div>
          </section>
        </div>
      </div>
      <div className="splitter"></div>
      <div className="container">
        <div className="wrapper">
          <section className="faq">
            <h1 className="faq__title">Поширені питання</h1>
            <FAQItems />
          </section>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default HomePage;
