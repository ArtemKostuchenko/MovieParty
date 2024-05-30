import React, { useEffect } from "react";
import "./style.page.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetDirectorByFullNameQuery } from "../../features/services/directors/directorsService";
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

const DirectorPage = ({ limit = 8 }) => {
  const { fullName } = useParams();
  const { disableFill } = useFill();
  const { page, handleChangePage } = usePagination();
  const { typeVideoContent, sortName, sortType } = useSelector(
    (store) => store.content
  );

  const { data: director, isLoading } = useGetDirectorByFullNameQuery(fullName);

  const { data: dataVC, isLoading: isLoadingVC } = useGetVideoContentQuery({
    director: fullName,
    typeVideoContent,
    sortName,
    sortType,
    limit,
    page,
  });

  useEffect(() => {
    if (!isLoading && director) {
      disableFill();
    }
  }, [isLoading]);

  if (isLoading || isLoadingVC) {
    return <Loader />;
  }

  if (!director) {
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
  } = director;

  const { totalCount: totalVideoContents, videoContent: videoContents } =
    dataVC;

  const photoURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/directors/${director.photoURL}`;

  return (
    <div className="container cnt-mn">
      <ScrollToTop />
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
                    <div className="director__item-title">Кількість праць:</div>
                    <div className="director__item-info">
                      {totalVideoContents}
                    </div>
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
                Всі фільми та серіали режисера {firstName} {lastName}
              </div>
              <div className="director__content-filters">
                <VideoContentSort includeGenres={false} includeYears={false} />
                <TypeContentFilter dropdown />
              </div>
              <div className="director__content-items">
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

export default DirectorPage;
