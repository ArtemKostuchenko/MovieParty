import React from "react";
import "./style.page.scss";
import { useParams } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { useGetSelectionByIdQuery } from "../../features/services/selections/selectionsService";
import {
  Loader,
  NotFound,
  Pagination,
  VideoContentCard,
} from "../../components";
import useFill from "../../hooks/useFill";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";

const SelectionPage = ({ limit = 18 }) => {
  const { selectionId } = useParams();
  const { page, handleChangePage } = usePagination();
  useFill();

  const { data: dataSL, isLoadingSL } = useGetSelectionByIdQuery(selectionId);

  const { data: dataVC, isLoading: isLoadingVC } = useGetVideoContentQuery({
    selection: selectionId,
    limit,
    page,
  });

  if (isLoadingSL || isLoadingVC) {
    return <Loader fixed />;
  }

  const { totalCount: totalVideoContents, videoContent: videoContents } =
    dataVC;

  if (!dataSL || !Boolean(totalVideoContents)) {
    return <NotFound title="Такої підбірки не існує" />;
  }

  const { name, description } = dataSL;

  return (
    <div className="container cnt-mn full" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="wrapper">
          <div className="selection-page cl p">
            <div className="selection-page-title">{name}</div>
            <div className="selection-page-description">{description}</div>
            <div className="selection-page-items">
              <div className="content__cards">
                {videoContents.map((item) => {
                  return <VideoContentCard key={item._id} {...item} />;
                })}
              </div>
              {totalVideoContents > limit && (
                <div className="content__pagination">
                  <Pagination
                    page={page}
                    limit={limit}
                    totalCount={totalVideoContents}
                    onChangePage={(page) => handleChangePage(page)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default SelectionPage;
