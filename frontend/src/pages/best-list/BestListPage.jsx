import React from "react";
import "./style.page.scss";
import { useParams } from "react-router-dom";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import { useGetTypesContentQuery } from "../../features/services/type-content/typeContentService";
import { useGetBestListsQuery } from "../../features/services/best-lists/bestListsService";
import {
  Loader,
  NotFound,
  Pagination,
  VideoContentSort,
  VideoContentCard,
} from "../../components";
import useFill from "../../hooks/useFill";
import usePagination from "../../hooks/usePagination";

const BestListPage = ({ limit = 30 }) => {
  const { typeVideoContentName, bestListName } = useParams();
  const { disableFill } = useFill();
  const { page, handleChangePage } = usePagination();

  const { data: dataVC, isLoading: isLoadingVC } = useGetVideoContentQuery({
    typeVideoContent: typeVideoContentName,
    bestList: bestListName,
  });

  const { data: dataTVC, isLoading: isLoadingTVC } = useGetTypesContentQuery({
    name: typeVideoContentName,
    reg: false,
  });

  const { data: dataBestList, isLoading: isLoadingBestList } =
    useGetBestListsQuery({
      name: bestListName,
      reg: false,
    });

  if (isLoadingVC || isLoadingBestList || isLoadingTVC) {
    return <Loader />;
  }

  const { totalCount: totalCountTVC, typesContent } = dataTVC;
  const { totalCount: totalCountBestLists, bestLists } = dataBestList;
  const { totalCount: totalVideoContents, videoContent: videoContents } =
    dataVC;

  if (!Boolean(totalCountTVC) || !Boolean(totalCountBestLists)) {
    if (!Boolean(totalCountTVC)) {
      return <NotFound title="Такого типу відеоконтенту не існує" />;
    } else if (!Boolean(totalCountBestLists)) {
      return <NotFound title="Такого списку не існує" />;
    } else {
      return <NotFound title="Такого типу відеоконтенту та списку не існує" />;
    }
  }

  return (
    <div className="container cnt-mn full">
      <div className="container" style={{ height: "100%" }}>
        <div className="wrapper">
          <div className="best-list__page">
            <div className="best-list__title">{bestLists[0].name}</div>
            <div className="best-list__content">
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

export default BestListPage;
