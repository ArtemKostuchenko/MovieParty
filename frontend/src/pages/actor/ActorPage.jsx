import React from "react";
import "./style.page.scss";
import { DropDown, DropDownItem, Pagination } from "../../components";
import { Navigate, useParams } from "react-router-dom";
import { useGetActorByFullNameQuery } from "../../features/services/actors/actorsService";
import { formatDate } from "../../features/utils/functions";

const ActorPage = () => {
  const { fullName } = useParams();

  if (!fullName) {
    return <Navigate to="/" />;
  }

  const { data: actor, isLoading } = useGetActorByFullNameQuery(fullName);

  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!actor) {
    return <Navigate to="/" />;
  }

  const {
    firstName,
    lastName,
    firstNameEng,
    lastNameEng,
    age,
    dateBirth,
    dateDeath,
    sex,
    placeBirth,
  } = actor;

  const photoURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/actors/${actor.photoURL}`;

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="actor">
            <div className="actor__info">
              <div className="actor__card">
                <div className="actor__photo">
                  <img src={photoURL} alt={`${firstName} ${lastName}`} />
                </div>
                <div className="actor__fullname">
                  {firstName} {lastName}
                </div>
                <div className="actor__origin-fullname">
                  {firstNameEng} {lastNameEng}
                </div>
              </div>
              <div className="actor__bio">
                <div className="actor__items">
                  <div className="actor__item">
                    <div className="actor__item-title">Вік:</div>
                    <div className="actor__item-info">{age} років</div>
                  </div>
                  <div className="actor__item">
                    <div className="actor__item-title">Дата народження:</div>
                    <div className="actor__item-info">
                      {formatDate(dateBirth, "dots")}
                    </div>
                  </div>
                  {dateDeath && (
                    <div className="actor__item">
                      <div className="actor__item-title">Дата смерті:</div>
                      <div className="actor__item-info">
                        {formatDate(dateDeath, "dots")}
                      </div>
                    </div>
                  )}
                  <div className="actor__item">
                    <div className="actor__item-title">Кількість робіт:</div>
                    <div className="actor__item-info">0</div>
                  </div>
                  <div className="actor__item">
                    <div className="actor__item-title">Стать:</div>
                    <div className="actor__item-info">
                      {sex === "Man" ? "Чоловіча" : "Жіноча"}
                    </div>
                  </div>
                  <div className="actor__item">
                    <div className="actor__item-title">Місце народження:</div>
                    <div className="actor__item-info">{placeBirth}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="actor__content">
              <div className="actor__content-title">
                Всі фільми та серіали з {sex === "Man" ? "актором" : "акторкою"}{" "}
                {firstName} {lastName}
              </div>
              <div className="actor__content-filters">
                <DropDown>
                  <DropDownItem selected value="new">
                    🔥 За новизною
                  </DropDownItem>
                  <DropDownItem value="watch">👀 За переглядами</DropDownItem>
                  <DropDownItem value="rating">🏆 За рейтингом</DropDownItem>
                  <DropDownItem value="added">⏰ Нещодавно додані</DropDownItem>
                </DropDown>
                <DropDown>
                  <DropDownItem selected value="movies">
                    Фільми
                  </DropDownItem>
                  <DropDownItem value="series">Серіали</DropDownItem>
                  <DropDownItem value="cartoons">Мультфільми</DropDownItem>
                  <DropDownItem value="cartoon-series">
                    Мультсеріали
                  </DropDownItem>
                </DropDown>
              </div>
              <div className="actor__content-items">
                <div className="content__items">
                  <div className="content__cards">
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-1.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод I - Прихована загроза
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-2.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод 2 - Атака клонів
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-3.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод 3 - Помста Сітхів
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-4.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод 4 - Нова надія
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-5.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод 5 - Імперія завдає удару у
                        відповідь
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-6.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод 6 - Повернення Джедая
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-1.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод I - Прихована загроза
                      </div>
                    </div>
                    <div className="content__card">
                      <div className="content__card-image">
                        <img src="./images/preview-2.jpg" alt="Title" />
                      </div>
                      <div className="content__card-title">
                        Зоряні війни: Епізод 2 - Атака клонів
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content__pagination">
                <Pagination page={1} limit={8} totalCount={13} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default ActorPage;
