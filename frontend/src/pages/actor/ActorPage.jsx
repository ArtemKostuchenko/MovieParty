import React, { useEffect } from "react";
import "./style.page.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetActorByFullNameQuery } from "../../features/services/actors/actorsService";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import { formatDate } from "../../features/utils/functions";
import {
  ScrollToTop,
  Loader,
  NotFound,
  Pagination,
  VideoContentSort,
  VideoContentCard,
  TypeContentFilter,
} from "../../components";
import useFill from "../../hooks/useFill";
import usePagination from "../../hooks/usePagination";

const ActorPage = ({ limit = 8 }) => {
  const { fullName } = useParams();
  const { disableFill } = useFill();
  const { page, handleChangePage } = usePagination();
  const { typeVideoContent, sortName, sortType } = useSelector(
    (store) => store.content
  );

  const { data: actor, isLoading } = useGetActorByFullNameQuery(fullName);

  const { data: dataVC, isLoading: isLoadingVC } = useGetVideoContentQuery({
    actor: fullName,
    typeVideoContent,
    sortName,
    sortType,
    limit,
    page,
  });

  useEffect(() => {
    if (!isLoading && actor) {
      disableFill();
    }
  }, [isLoading]);

  if (isLoading || isLoadingVC) {
    return <Loader />;
  }

  if (!actor) {
    return <NotFound title="Такого актора не існує" />;
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

  const { totalCount: totalVideoContents, videoContent: videoContents } =
    dataVC;

  const photoURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/actors/${actor.photoURL}`;

  return (
    <div className="container cnt-mn full">
      <ScrollToTop />
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
                    <div className="actor__item-info">{totalVideoContents}</div>
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
                <VideoContentSort includeGenres={false} includeYears={false} />
                <TypeContentFilter dropdown />
              </div>
              <div className="actor__content-items">
                <div className="content__cards">
                  {videoContents.length < limit &&
                    Array.from({ length: limit }).map((_, index) => {
                      if (index <= videoContents.length - 1) {
                        const item = videoContents[index];
                        return <VideoContentCard key={item._id} {...item} />;
                      } else {
                        return (
                          <VideoContentCard key={`fake__card-${index}`} fake />
                        );
                      }
                    })}
                  {videoContents.length >= limit &&
                    videoContents.map((item) => {
                      return <VideoContentCard key={item._id} {...item} />;
                    })}
                </div>
              </div>
              <div className="content__pagination">
                <Pagination
                  page={page}
                  limit={limit}
                  totalCount={totalVideoContents}
                  onChangePage={(page) => handleChangePage(page)}
                />
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
