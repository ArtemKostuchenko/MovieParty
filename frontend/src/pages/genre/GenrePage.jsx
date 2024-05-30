import React from "react";
import "./style.page.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import { useGetTypesContentQuery } from "../../features/services/type-content/typeContentService";
import { useGetGenresQuery } from "../../features/services/genre/genreService";
import { capitalizeFirstLetter } from "../../features/utils/functions";
import {
  Loader,
  NotFound,
  Pagination,
  VideoContentSort,
  VideoContentCard,
} from "../../components";
import useFill from "../../hooks/useFill";
import usePagination from "../../hooks/usePagination";

const GenrePage = ({ limit = 30 }) => {
  const { typeVideoContentName, originNameGenre } = useParams();
  const { disableFill } = useFill();
  const { page, handleChangePage } = usePagination();
  const { sortName, sortType } = useSelector((store) => store.content);

  const { data: dataVC, isLoading: isLoadingVC } = useGetVideoContentQuery({
    typeVideoContent: typeVideoContentName,
    genre: originNameGenre,
    sortName,
    sortType,
    limit,
    page,
  });

  const { data: dataTVC, isLoading: isLoadingTVC } = useGetTypesContentQuery({
    name: typeVideoContentName,
    reg: false,
  });

  const { data: dataGenre, isLoading: isLoadingGenre } = useGetGenresQuery({
    name: capitalizeFirstLetter(originNameGenre),
    reg: false,
  });

  if (isLoadingVC || isLoadingGenre || isLoadingTVC) {
    return <Loader />;
  }

  const { totalCount: totalCountTVC, typesContent } = dataTVC;
  const { totalCount: totalCountGenres, genres } = dataGenre;
  const { totalCount: totalVideoContents, videoContent: videoContents } =
    dataVC;

  if (!Boolean(totalCountTVC) || !Boolean(totalCountGenres)) {
    if (!Boolean(totalCountTVC)) {
      return <NotFound title="Такого типу відеоконтенту не існує" />;
    } else if (!Boolean(totalCountGenres)) {
      return <NotFound title="Такого жанру не існує" />;
    } else {
      return <NotFound title="Такого типу відеоконтенту та жанру не існує" />;
    }
  }

  return (
    <div className="container cnt-mn full">
      <div className="container" style={{ height: "100%" }}>
        <div className="wrapper">
          <div className="genre__page">
            <div className="genre__title">
              Найкращі {typesContent[0].name.toLowerCase()} в жанрі{" "}
              {genres[0].name.toLowerCase()}
            </div>
            <div className="genre__sort">
              <VideoContentSort includeGenres={false} includeYears={false} />
            </div>
            <div className="genre__content">
              <div className="content__cards">
                {videoContents.map((item) => {
                  return <VideoContentCard key={item._id} {...item} />;
                })}
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

export default GenrePage;
