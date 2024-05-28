import React from "react";
import VideoContentCard from "./VideoContentCard";
import usePagination from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import { Pagination } from "../Pagination";

const VideoContentItems = ({ limit = 30 }) => {
  const { page, handleChangePage } = usePagination();

  const {
    typeVideoContent,
    selectedGenres,
    selectedYears,
    sortName,
    sortType,
  } = useSelector((store) => store.content);

  const { data, isLoading } = useGetVideoContentQuery({
    typeVideoContent,
    genres: selectedGenres ? [selectedGenres] : [],
    releaseYears: selectedYears,
    page: page,
    limit,
    sortName,
    sortType,
  });

  if (isLoading) {
    return (
      <div className="content__cards">
        {Array.from({ length: limit }).map((_, index) => (
          <VideoContentCard key={`card_skeleton_${index}`} skeleton />
        ))}
      </div>
    );
  }

  const videoContents = data.videoContent;

  return (
    <>
      <div className="content__cards">
        {videoContents.map((item) => {
          return <VideoContentCard key={item._id} {...item} />;
        })}
      </div>
      <div className="content__pagination">
        <Pagination
          page={page}
          limit={limit}
          totalCount={data.totalCount}
          onChangePage={(page) => handleChangePage(page)}
        />
      </div>
    </>
  );
};

export default VideoContentItems;
