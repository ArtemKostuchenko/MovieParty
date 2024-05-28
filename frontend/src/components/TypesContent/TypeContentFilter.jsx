import React, { useState, useEffect } from "react";
import {
  setSelectedTypeVideoContent,
  clearContent,
} from "../../features/store/slices/content";
import { useDispatch, useSelector } from "react-redux";
import { useGetTypesContentQuery } from "../../features/services/type-content/typeContentService";
import FilterItem from "../Filter/FilterItem";

const TypeContentFilter = ({ selected = "all" }) => {
  const dispatch = useDispatch();
  const { typeVideoContent } = useSelector((store) => store.content);
  const { data: dataTypes, isLoading } = useGetTypesContentQuery();

  if (isLoading) {
    return (
      <div className="filter">
        <div className="flex row center-v h40">
          <div className="overflow-content">
            <div className="filter__items">
              <div className="filter__item loader-skeleton type-content-all"></div>
              <div className="filter__item loader-skeleton type-content-item"></div>
              <div className="filter__item loader-skeleton type-content-item"></div>
              <div className="filter__item loader-skeleton type-content-item"></div>
              <div className="filter__item loader-skeleton type-content-item"></div>
            </div>
          </div>
        </div>
        <div className="reset-button">
          <button className="loader-skeleton button">Очистити</button>
        </div>
      </div>
    );
  }

  const typesContent = dataTypes.typesContent;

  const handleChangeTypeContent = (id) => {
    const typeContent = typesContent.find(
      (typeContent) => typeContent._id === id
    );
    if (!typeContent) return;
    dispatch(setSelectedTypeVideoContent(typeContent._id));
  };

  return (
    <div className="filter">
      <div className="flex row center-v h40">
        <div className="overflow-content">
          <div className="filter__items">
            <div
              className={`filter__item ${
                typeVideoContent === "all" ? " active" : ""
              }`}
              onClick={() => dispatch(setSelectedTypeVideoContent("all"))}
            >
              <button>Все</button>
            </div>
            {typesContent.map((typeContent) => {
              const { _id, name } = typeContent;
              return (
                <FilterItem
                  key={_id}
                  id={_id}
                  name={name}
                  onClick={handleChangeTypeContent}
                  active={_id === typeVideoContent}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="reset-button">
        <button
          className="button additional"
          onClick={() => dispatch(clearContent())}
        >
          Очистити
        </button>
      </div>
    </div>
  );
};

export default TypeContentFilter;
