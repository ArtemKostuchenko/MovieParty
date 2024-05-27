import React from "react";
import { useSelector } from "react-redux";

const Slides = ({ handleSetActiveSlideIndex, slides }) => {
  const { activeSlideIndex } = useSelector((state) => state.carousel);

  return (
    <div className="slides">
      <div className="slides__items">
        {slides.map((slide, index) => {
          return (
            <button
              className={`slide__item${
                activeSlideIndex === index ? " selected" : ""
              }`}
              onClick={() => {
                handleSetActiveSlideIndex(index);
              }}
            >
              <div className="filter" />
              <div className="slide__image">
                <img src={slide.previewURL} alt={slide.title} />
              </div>
            </button>
          );
        })}
        {/* <button className="slide__item selected">
          <div className="filter" />
          <div className="slide__image">
            <img src={Preview1} alt="Img" />
          </div>
        </button>
        <button className="slide__item">
          <div className="filter" />
          <div className="slide__image">
            <img src={Preview2} alt="Img" />
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default Slides;
