import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearContent,
  setSelectedGenres,
  setSelectedSort,
  setSelectedYears,
} from "../../features/store/slices/content";
import DropDown from "../DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem";
import { useGetGenresQuery } from "../../features/services/genre/genreService";

const VideoContentSort = () => {
  const dispatch = useDispatch();
  const { selectedSort, selectedGenres, selectedYears } = useSelector(
    (store) => store.content
  );

  const { data, isLoading } = useGetGenresQuery();

  useEffect(() => {
    dispatch(clearContent());
  }, []);

  if (isLoading) {
    return (
      <div className="sort">
        <div className="sort__items">
          <div className="sort__item w300 loader-skeleton sort-content"></div>
          <div className="sort__item w230 loader-skeleton sort-content"></div>
          <div className="sort__item w230 loader-skeleton sort-content"></div>
        </div>
      </div>
    );
  }

  const genres = data.genres;

  const handleChangeSort = (value) => {
    dispatch(setSelectedSort(value));
  };

  const handleChangeGenre = (value) => {
    dispatch(setSelectedGenres(value));
  };

  const handleChangeYears = (value) => {
    dispatch(setSelectedYears(value));
  };

  return (
    <div className="sort">
      <div className="sort__items">
        <div className="sort__item w300">
          <DropDown fill value={selectedSort} onChange={handleChangeSort}>
            <DropDownItem value="new">🔥 За новизною</DropDownItem>
            <DropDownItem value="watch">👀 За переглядами</DropDownItem>
            <DropDownItem value="rating">🏆 За рейтингом</DropDownItem>
          </DropDown>
        </div>
        <div className="sort__item w230">
          <DropDown
            fill
            placeholder="Виберіть жанр"
            value={selectedGenres}
            onChange={handleChangeGenre}
          >
            {genres.map((genre) => {
              return (
                <DropDownItem key={genre._id} value={genre._id}>
                  {genre.name}
                </DropDownItem>
              );
            })}
          </DropDown>
        </div>
        <div className="sort__item w230">
          <DropDown
            fill
            placeholder="Виберіть рік"
            value={selectedYears}
            onChange={handleChangeYears}
          >
            <DropDownItem value="2024">2024</DropDownItem>
            <DropDownItem value="2023">2023</DropDownItem>
            <DropDownItem value="2022">2022</DropDownItem>
            <DropDownItem value="2021">2021</DropDownItem>
            <DropDownItem value="2020,2019,2017,2017">2020 - 2016</DropDownItem>
          </DropDown>
        </div>
      </div>
    </div>
  );
};

export default VideoContentSort;
