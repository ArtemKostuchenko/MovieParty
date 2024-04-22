import React from "react";
import MainBackground from "../../assets/main-background.png";
import "./style.css";

const HomePage = () => {
  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <section class="welcome__service">
        <div class="container information__overlay">
          <div class="wrapper small max-height">
            <div class="information__main">
              <h1 class="information__title">
                Спільний перегляд фільмів, серіалів, мультфільмів та іншого
                контенту без обмежень
              </h1>
              <p class="information__description">
                Дивіться будь де. Підписку можна скасувати в будь-який час.
              </p>
              <p class="information__motivation">
                Готові до <span class="motivation__main">Party</span>
                <span class="motivation__alternative">Вечеріки</span> з друзями?
                Натисніть оформити підписку.
              </p>
              <button class="button primary information__subscribe">
                Оформити підписку
              </button>
            </div>
          </div>
        </div>
        <div class="background__main background__overlay">
          <img src={MainBackground} alt="MainImage" />
        </div>
      </section>
      <div class="splitter"></div>
      <div class="container">
        <div class="wrapper">
          <section class="information__content">
            <div class="wrapper small">
              <h1 class="information__content-title">
                Cвіт незабутніх емоцій кіно
              </h1>
              <p class="information__content-description">
                Ласкаво просимо до нашого веб-сервісу, де світ кіно та
                телесеріалів стає вашим особистим плейлистом. З нами ви
                отримуєте необмежений доступ до величезної бібліотеки
                різноманітних фільмів та серіалів, яка поєднує у собі всі жанри,
                епохи та смаки глядачів
              </p>
            </div>
            <div class="benefits">
              <div class="benefits__items">
                <div class="benefit__item">
                  <div class="benefit__circle">
                    <div class="benefit__icon">
                      <div class="icon library"></div>
                    </div>
                  </div>
                  <div class="benefit__title">Величезна бібліотека</div>
                  <div class="benefit__description">
                    Необмежений доступ до величезної бібліотеки різноманітних
                    фільмів та серіалів, яка поєднує у собі всі жанри, епохи та
                    смаки глядачів.
                  </div>
                </div>
                <div class="benefit__item">
                  <div class="benefit__circle">
                    <div class="benefit__icon">
                      <div class="icon convenient-use"></div>
                    </div>
                  </div>
                  <div class="benefit__title">Зручність використання</div>
                  <div class="benefit__description">
                    Зручний інтерфейс нашого веб-сервісу дозволяє легко шукати,
                    зберігати та ділитися враженнями про переглянуте.
                  </div>
                </div>
                <div class="benefit__item">
                  <div class="benefit__circle">
                    <div class="benefit__icon">
                      <div class="icon watch-together"></div>
                    </div>
                  </div>
                  <div class="benefit__title">Спільний перегляд</div>
                  <div class="benefit__description">
                    Разом з друзями або новими знайомими ви можете
                    насолоджуватися фільмами та серіалами в реальному часі,
                    обговорюючи їх із захопленням.
                  </div>
                </div>
                <div class="benefit__item">
                  <div class="benefit__circle">
                    <div class="benefit__icon">
                      <div class="icon library"></div>
                    </div>
                  </div>
                  <div class="benefit__title">Постійні оновлення</div>
                  <div class="benefit__description">
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
      <div class="splitter"></div>
      <div class="container">
        <div class="wrapper">
          <section class="watch__anywhere">
            <div class="watch__anywhere-item">
              <h1 class="watch__anywhere-title">Дивіться будь-де</h1>
              <p class="watch__anywhere-description">
                Дивіться фільми, серіали, мультфільми без обмежень на смартфоні,
                планшеті, ноутбуці й телевізорі.
              </p>
            </div>
            <div class="watch__anywhere-image">
              <img src="./images/watch_anywhere.png" alt="Дивіться будь-де" />
            </div>
          </section>
        </div>
      </div>
      <div class="splitter"></div>
      <div class="container">
        <div class="wrapper">
          <section class="faq">
            <h1 class="faq__title">Поширені питання</h1>
            <div class="faq__items">
              <div class="faq__item active">
                <div class="faq__item-action">
                  <h3 class="faq__item-title">Що таке MovieParty?</h3>
                  <div class="faq__item-plus">
                    <div class="icon plus"></div>
                  </div>
                </div>
                <div class="faq__item-hide">
                  <p class="faq__item-description">
                    MovieParty - це ваш особистий кінотеатр у власному домі! Це
                    інноваційна веб-платформа, яка дозволяє користувачам
                    насолоджуватися переглядом різноманітного відеоконтенту у
                    режимі реального часу, будь-де та будь-коли. Запрошуйте
                    друзів або насолоджуйтеся переглядом самі - MovieParty
                    створює можливість синхронного перегляду та обговорення
                    контенту у реальному часі. Поділіться враженнями, створіть
                    власні вечірки з фільмами та серіалами, і насолоджуйтеся
                    магією спільного перегляду разом з MovieParty!
                  </p>
                </div>
              </div>
              <div class="faq__item">
                <div class="faq__item-action">
                  <h3 class="faq__item-title">Що таке cпільний перегляд?</h3>
                  <div class="faq__item-plus">
                    <div class="icon plus"></div>
                  </div>
                </div>
                <div class="faq__item-hide">
                  <p class="faq__item-description"></p>
                </div>
              </div>
              <div class="faq__item">
                <div class="faq__item-action">
                  <h3 class="faq__item-title">Де можна дивитись контент?</h3>
                  <div class="faq__item-plus">
                    <div class="icon plus"></div>
                  </div>
                </div>
                <div class="faq__item-hide">
                  <p class="faq__item-description"></p>
                </div>
              </div>
              <div class="faq__item">
                <div class="faq__item-action">
                  <h3 class="faq__item-title">
                    Скільки коштує підписка на місяць?
                  </h3>
                  <div class="faq__item-plus">
                    <div class="icon plus"></div>
                  </div>
                </div>
                <div class="faq__item-hide">
                  <p class="faq__item-description"></p>
                </div>
              </div>
              <div class="faq__item">
                <div class="faq__item-action">
                  <h3 class="faq__item-title">Як скасувати підписку?</h3>
                  <div class="faq__item-plus">
                    <div class="icon plus"></div>
                  </div>
                </div>
                <div class="faq__item-hide">
                  <p class="faq__item-description"></p>
                </div>
              </div>
              <div class="faq__item">
                <div class="faq__item-action">
                  <h3 class="faq__item-title">
                    Що можна подивитися на даному сервісі?
                  </h3>
                  <div class="faq__item-plus">
                    <div class="icon plus"></div>
                  </div>
                </div>
                <div class="faq__item-hide">
                  <p class="faq__item-description"></p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="splitter"></div>
    </div>
  );
};

export default HomePage;
