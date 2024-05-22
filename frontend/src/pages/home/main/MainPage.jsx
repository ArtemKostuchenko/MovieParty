import React from "react";
import "./style.page.scss";
import Avatar from "../../../assets/avatar.png";
import Slide1 from "../../../assets/slide-1.png";
import Preview1 from "../../../assets/preview-1.jpg";
import Preview2 from "../../../assets/preview-2.jpg";
import Preview3 from "../../../assets/preview-3.jpg";
import Preview4 from "../../../assets/preview-4.jpg";
import Preview5 from "../../../assets/preview-5.jpg";
import Preview6 from "../../../assets/preview-6.jpg";
import Preview7 from "../../../assets/preview-7.jpg";
import Preview8 from "../../../assets/preview-8.jpg";
import Preview9 from "../../../assets/preview-9.jpg";
import useUser from "../../../hooks/useUser";
import { DropDown, DropDownItem } from "../../../components";
import VideoContentItems from "../../../components/VideoContentItems/VideoContentItems";
import { useGetVideoContentQuery } from "../../../features/services/content/contentService";

const MainPage = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetVideoContentQuery({
    title: "",
    page: "",
    limit: "",
    sortName: "",
    sortType: "",
  });

  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid">
          <div className="grid__content">
            <div className="slider">
              <div className="slider__background">
                <div className="slider__background-filter"></div>
                <div className="slider__background-image">
                  <img
                    src={Slide1}
                    alt="Зоряні війни: Епізод IX -Скайвокер. Сходження "
                  />
                </div>
              </div>
              <div className="slider__content">
                <div className="container wrapper">
                  <div className="slide__information">
                    <div className="slide">
                      <h1 className="slide__title">
                        Зоряні війни: Епізод IX - Скайвокер. Сходження
                      </h1>
                      <div className="slide__details">
                        <div className="slide__IMDb">
                          <div className="icon IMDb" />
                          <p className="slide__IMDb-rating">6.4</p>
                        </div>
                        <span className="slide__splitter circle" />
                        <div className="slide__additional">
                          <p className="slide__year">2019</p>
                          <span className="slide__splitter" />
                          <p className="slide__duration">2 год 21 хв</p>
                          <span className="slide__splitter" />
                          <p className="slide__genre">Фентезі</p>
                        </div>
                      </div>
                      <p className="slide__description">
                        У цьому епічному завершенні саги про Скайуокера вцілілі
                        члени Опору на чолі з генералом Леєю Органою (Керрі
                        Фішер) стикаються зі своїм найбільшим викликом.
                        Готуючись до фінальної сутички зі зловісним Першим
                        Орденом, Рей (Дейзі Рідлі) продо...
                        <a href="#" className="slide__link">
                          Дивитись більше
                        </a>
                      </p>
                      <div className="slide__actions">
                        <a href="#" className="button light outline">
                          Трейлер
                        </a>
                        <a href="#" className="button icon g8">
                          <div className="icon watch" />
                          Дивитися
                        </a>
                      </div>
                    </div>
                    <div className="slide__navigation">
                      <button className="slide__navigation-button">
                        <div className="icon arrow left" />
                      </button>
                      <button className="slide__navigation-button">
                        <div className="icon arrow right" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="slides">
                  <div className="slides__items">
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview6} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview7} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview8} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview9} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item selected">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview1} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview2} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview3} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview4} alt="Img" />
                      </div>
                    </button>
                    <button className="slide__item">
                      <div className="filter" />
                      <div className="slide__image">
                        <img src={Preview5} alt="Img" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="side-nav">
        <section className="side-nav__content">
          <div className="side-nav__profile">
            <div className="side-nav__avatar">
              <img src={Avatar} alt="Qwerty" />
            </div>
            <div className="side-nav__username">{user.nickname}</div>
          </div>
          <div className="side-nav__menu">
            <nav className="nav-menu">
              <div className="nav-menu__items">
                <div className="nav-menu__item">
                  <div className="nav-menu__icon">
                    <img src="../images/profile.svg" alt="Профіль" />
                  </div>
                  <div className="nav-menu__title">Профіль</div>
                </div>
                <div className="nav-menu__item">
                  <div className="nav-menu__icon">
                    <svg
                      className="menu__icon selections"
                      viewBox="0 0 22 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2917 0.625H3.7084L0.583405 6.875L11.0001 19.375L21.4167 6.875L18.2917 0.625ZM8.52091 5.83333L10.0834 2.70833H11.9167L13.4792 5.83333H8.52091ZM9.95841 7.91667V14.875L4.16674 7.91667H9.95841ZM12.0417 7.91667H17.8334L12.0417 14.875V7.91667ZM18.5626 5.83333H15.8022L14.2397 2.70833H17.0001L18.5626 5.83333ZM5.00007 2.70833H7.76049L6.19799 5.83333H3.43757L5.00007 2.70833Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="nav-menu__title">Підбірки</div>
                </div>
                <div className="nav-menu__item">
                  <div className="nav-menu__icon">
                    <svg
                      className="menu__icon favorite"
                      width={23}
                      height={18}
                      viewBox="0 0 23 18"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5001 14V11H14.5001V9H17.5001V6H19.5001V9H22.5001V11H19.5001V14H17.5001ZM10.5001 18L7.32506 15.15C6.12506 14.0667 5.09606 13.1 4.23806 12.25C3.37939 11.4 2.67106 10.6 2.11306 9.85C1.55439 9.1 1.14606 8.375 0.888061 7.675C0.629394 6.975 0.500061 6.24167 0.500061 5.475C0.500061 3.90833 1.02506 2.604 2.07506 1.562C3.12506 0.520666 4.43339 0 6.00006 0C6.86673 0 7.69173 0.179 8.47506 0.537C9.2584 0.895667 9.93339 1.40833 10.5001 2.075C11.0667 1.40833 11.7417 0.895667 12.5251 0.537C13.3084 0.179 14.1334 0 15.0001 0C16.4167 0 17.6041 0.429 18.5621 1.287C19.5207 2.14567 20.1167 3.15 20.3501 4.3C20.0501 4.18333 19.7501 4.09567 19.4501 4.037C19.1501 3.979 18.8584 3.95 18.5751 3.95C16.8917 3.95 15.4584 4.53733 14.2751 5.712C13.0917 6.88733 12.5001 8.31667 12.5001 10C12.5001 10.8667 12.6751 11.6873 13.0251 12.462C13.3751 13.2373 13.8667 13.9 14.5001 14.45C14.1834 14.7333 13.7707 15.096 13.2621 15.538C12.7541 15.9793 12.3167 16.3667 11.9501 16.7L10.5001 18Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="nav-menu__title">Збережене</div>
                </div>
              </div>
            </nav>
          </div>
        </section>
      </aside>
      <div className="splitter" />
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content__filter">
              <div className="filter">
                <div className="flex row center-v h40">
                  <div className="overflow-content">
                    <div className="filter__items">
                      <div className="filter__item active">
                        <button>Все</button>
                      </div>
                      <div className="filter__item">
                        <button>Фільми</button>
                      </div>
                      <div className="filter__item">
                        <button>Серіали</button>
                      </div>
                      <div className="filter__item">
                        <button>Мультфільми</button>
                      </div>
                      <div className="filter__item">
                        <button>Мультсеріали</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reset-button">
                  <button className="button additional">Очистити</button>
                </div>
              </div>
            </div>
            <div className="content__sort">
              <div className="sort">
                <div className="sort__items">
                  <div className="sort__item">
                    <DropDown>
                      <DropDownItem selected value="new">
                        🔥 За новизною
                      </DropDownItem>
                      <DropDownItem value="watch">
                        👀 За переглядами
                      </DropDownItem>
                      <DropDownItem value="rating">
                        🏆 За рейтингом
                      </DropDownItem>
                      <DropDownItem value="added">
                        ⏰ Нещодавно додані
                      </DropDownItem>
                    </DropDown>
                  </div>
                  <div className="sort__item">
                    <DropDown>
                      <DropDownItem selected>Виберіть жанр</DropDownItem>
                      <DropDownItem value="fantasy">Фантастика</DropDownItem>
                      <DropDownItem value="action">Бойовик</DropDownItem>
                      <DropDownItem value="drama">Драма</DropDownItem>
                    </DropDown>
                  </div>
                  <div className="sort__item">
                    <DropDown>
                      <DropDownItem selected>Виберіть рік</DropDownItem>
                      <DropDownItem value="2024">2024</DropDownItem>
                      <DropDownItem value="2023">2023</DropDownItem>
                      <DropDownItem value="2022">2022</DropDownItem>
                      <DropDownItem value="2021">2021</DropDownItem>
                      <DropDownItem value="2020">2020</DropDownItem>
                    </DropDown>
                  </div>
                </div>
              </div>
            </div>
            <div className="content__items">
              {isLoading ? (
                <>Loading...</>
              ) : (
                <VideoContentItems items={data.videoContent} />
              )}
              <div className="content__pagination">
                <div className="pagination">
                  <div className="pagination__action">
                    <div className="icon arrow left" />
                  </div>
                  <div className="pagination__items">
                    <div className="pagination__item">1</div>
                    <div className="pagination__item">2</div>
                    <div className="pagination__item">3</div>
                    <div className="pagination__item">4</div>
                    <div className="pagination__item">5</div>
                    <div className="pagination__item skip">...</div>
                    <div className="pagination__item">255</div>
                  </div>
                  <div className="pagination__action">
                    <div className="icon arrow right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="splitter" />
    </div>
  );
};

export default MainPage;
