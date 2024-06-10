import React, { useEffect } from "react";
import "./style.page.scss";
import useSubscription from "../../hooks/useSubscription";
import useFill from "../../hooks/useFill";
import { Loader } from "../../components";
import { Navigate } from "react-router-dom";

const SubscribePage = () => {
  const { subscription, isLoading } = useSubscription();
  const { disableFill } = useFill();

  useEffect(() => {
    if (!isLoading) {
      disableFill();
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (subscription) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="subscribe">
            <div className="subscribe__top">Оберіть свій план</div>
            <div className="subscribe__items">
              <div className="subscribe__item base">
                <div className="subscribe__name">Base Plan</div>
                <div className="subscribe__price">
                  1.99 USD /<span className="subscribe__type">місяць</span>
                </div>
                <div className="subscribe__splitter" />
                <div className="subscribe__benefits-title">
                  Особливості / Переваги
                </div>
                <div className="subscribe__benefits">
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Якість 480p
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Обмежена біліотека контенту
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Доступ на будь-якому девайсі
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Оновлення плану у будь-який час
                    </div>
                  </div>
                </div>
                <div className="subscribe__button">
                  <button className="button primary fill" disabled>
                    Скоро
                  </button>
                </div>
              </div>
              <div className="subscribe__item starter">
                <div className="subscribe__name">
                  <div className="subscribe__popular">
                    <div className="subscribe__popular-title">Популярний</div>
                  </div>
                  Starter Plan
                </div>
                <div className="subscribe__price">
                  4.99 USD /<span className="subscribe__type">місяць</span>
                </div>
                <div className="subscribe__splitter" />
                <div className="subscribe__benefits-title">
                  Особливості / Переваги
                </div>
                <div className="subscribe__benefits">
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Якість 1080p
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Необмежена біліотека контенту
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Спільний перегляд контенту
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Доступ на будь-якому девайсі
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Оновлення плану у будь-який час
                    </div>
                  </div>
                </div>
                <div className="subscribe__button">
                  <button className="button primary fill">Підписатися</button>
                </div>
              </div>
              <div className="subscribe__item premium">
                <div className="subscribe__name">Premium Plan</div>
                <div className="subscribe__price">
                  9.99 USD /<span className="subscribe__type">місяць</span>
                </div>
                <div className="subscribe__splitter" />
                <div className="subscribe__benefits-title">
                  Особливості / Переваги
                </div>
                <div className="subscribe__benefits">
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Якість 4K
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Все як в Starter Plan
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Завантаження контенту
                    </div>
                  </div>
                  <div className="subscribe__benefits-item">
                    <div className="icon success" />
                    <div className="subscribe__benefits-item-title">
                      Оновлення плану у будь-який час
                    </div>
                  </div>
                </div>
                <div className="subscribe__button">
                  <button className="button primary fill" disabled>
                    Скоро
                  </button>
                </div>
              </div>
            </div>
            <div className="subscribe__footer">
              Підписку можна скасувати у будь-який час
            </div>
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default SubscribePage;
