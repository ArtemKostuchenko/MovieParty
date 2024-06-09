import React from "react";
import "./style.page.scss";
import {
  ContentSlider,
  TypeContentFilter,
  VideoContentSort,
  VideoContentItems,
} from "../../../components";
import useUser from "../../../hooks/useUser";

const MainPage = () => {
  const { user } = useUser();

  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <ContentSlider />
      <div className="splitter" />
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content__filter">
              <TypeContentFilter />
            </div>
            <div className="content__sort">
              <VideoContentSort />
            </div>
            <div className="content__items">
              <VideoContentItems />
            </div>
          </div>
        </div>
      </div>
      <div className="splitter" />
    </div>
  );
};

export default MainPage;
