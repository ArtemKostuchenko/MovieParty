import React from "react";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import VideoContentItem from "./VideoContentItem";
import { Pagination } from "../Pagination";
import { Sort, SortItem } from "../Sort";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";

const VideoContentList = ({ limit = 5, title = "" }) => {
  const { sortName, sortType, handleChangeSort } = useSort();
  const { page, handleChangePage } = usePagination();

  const { data, isLoading, isError } = useGetVideoContentQuery({
    title,
    page,
    limit,
    sortName,
    sortType,
  });

  if (isLoading) {
    return (
      <>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
        <Pagination page={page} limit={limit} totalCount={1} />
      </>
    );
  }

  if (isError) {
    return <div className="overflow-content">Error...</div>;
  }

  const { videoContent, totalCount } = data;

  return (
    <div className="overflow-content">
      <div className="view-items">
        <div className="view-row head">
          <Sort
            onChange={(sortName, sortType) => {
              handleChangeSort(sortName, sortType);
            }}
            sortName={sortName}
            sortType={sortType}
          >
            <SortItem name="title">
              <div className="view-col">Назва контенту</div>
            </SortItem>
            <SortItem name="originTitle">
              <div className="view-col">Оригінальна назва</div>
            </SortItem>
            <SortItem name="typeVideoContent">
              <div className="view-col">Тип контенту</div>
            </SortItem>
            <SortItem name="createdAt">
              <div className="view-col">Дата додавання</div>
            </SortItem>
          </Sort>
          <div className="view-col">Дії</div>
        </div>
        {videoContent.length !== limit &&
          Array.from({ length: limit }).map((_, index) => {
            if (videoContent.length > index) {
              const vc = videoContent[index];
              return <VideoContentItem key={vc._id} {...vc} />;
            } else {
              return (
                <VideoContentItem
                  key={`skeleton-video-content-${index}`}
                  skeleton
                />
              );
            }
          })}
        {videoContent.length === limit &&
          videoContent.map((vc) => <VideoContentItem key={vc._id} {...vc} />)}
      </div>
      <Pagination
        page={page}
        limit={limit}
        totalCount={totalCount}
        onChangePage={(ePage) => handleChangePage(ePage)}
      />
    </div>
  );
};

export default VideoContentList;
