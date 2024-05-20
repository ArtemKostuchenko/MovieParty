import React from "react";
import { Navigate, useParams } from "react-router-dom";
import "./style.page.scss";
import { DropDown, DropDownItem, Pagination } from "../../components";
import { formatDate } from "../../features/utils/functions";
import { useGetDirectorByFullNameQuery } from "../../features/services/directors/directorsService";

const DirectorPage = () => {
  const { fullName } = useParams();

  if (!fullName) {
    return <Navigate to="/" />;
  }

  const { data: director, isLoading } = useGetDirectorByFullNameQuery(fullName);

  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!director) {
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
  } = director;

  const photoURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/directors/${director.photoURL}`;

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="director">
            <div className="director__info">
              <div className="director__card">
                <div className="director__photo">
                  <img src={photoURL} alt={`${firstName} ${lastName}`} />
                </div>
                <div className="director__fullname">
                  {firstName} {lastName}
                </div>
                <div className="director__origin-fullname">
                  {firstNameEng} {lastNameEng}
                </div>
              </div>
              <div className="director__bio">
                <div className="director__items">
                  <div className="director__item">
                    <div className="director__item-title">Вік:</div>
                    <div className="director__item-info">{age} років</div>
                  </div>
                  <div className="director__item">
                    <div className="director__item-title">Дата народження:</div>
                    <div className="director__item-info">
                      {formatDate(dateBirth, "dots")}
                    </div>
                  </div>
                  {dateDeath && (
                    <div className="director__item">
                      <div className="director__item-title">Дата смерті:</div>
                      <div className="director__item-info">
                        {formatDate(dateDeath, "dots")}
                      </div>
                    </div>
                  )}
                  <div className="director__item">
                    <div className="director__item-title">Кількість робіт:</div>
                    <div className="director__item-info">0</div>
                  </div>
                  <div className="director__item">
                    <div className="director__item-title">Стать:</div>
                    <div className="director__item-info">
                      {sex === "Man" ? "Чоловіча" : "Жіноча"}
                    </div>
                  </div>
                  <div className="director__item">
                    <div className="director__item-title">
                      Місце народження:
                    </div>
                    <div className="director__item-info">{placeBirth}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="director__content">
              <div className="director__content-title">
                Всі фільми та серіали режисера
                {firstName} {lastName}
              </div>
              <div className="director__content-filters">
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
              <div className="director__content-items">
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

export default DirectorPage;
