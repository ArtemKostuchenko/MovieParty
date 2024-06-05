import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import Slides from "./Slides";
import TrailerPopUp from "../PopUp/TrailerPopUp";
import useCarousel from "../../hooks/useCarousel";
import usePopUp from "../../hooks/usePopup";

const ContentSlider = () => {
  const { isAdd, handleAddPopUp } = usePopUp();
  const trailerURL = useRef(null);

  const { isLoading, data } = useGetVideoContentQuery({
    fields:
      "title,previewURL,backgroundURL,trailerURL,IMDb,releaseDate,duration,genres,description",
    limit: 9,
    sortName: "createdAt",
    sortType: "desc",
  });

  const {
    activeSlideIndex,
    nextSlide,
    prevSlide,
    handleSetActiveSlideIndex,
    handleAutoPlayStart,
    handleAutoPlayStop,
  } = useCarousel(5000, 9);

  if (isLoading) {
    return (
      <>
        <div>
          <div className="container">
            <div className="grid">
              <div className="grid__content">
                <div className="slider">
                  <div className="loader__container">
                    <div className="loader"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const videoContents = data.videoContent;

  const slides = videoContents.map((videoContent) => {
    return {
      _id: videoContent._id,
      previewURL: `${
        import.meta.env.VITE_BACK_HOST
      }/static/files/images/content/${videoContent.previewURL}`,
      title: videoContent.title,
    };
  });

  const currentSlide = videoContents[activeSlideIndex];

  const videoContentLink = `/${
    currentSlide.typeVideoContent.path
  }/${currentSlide.originTitle.toLowerCase().replace(/\s/g, "-")}`;

  const handleShowTrailer = () => {
    trailerURL.current = currentSlide.trailerURL;
    handleAddPopUp();
  };

  return (
    <div>
      <div className="container">
        <div className="grid">
          <div className="grid__content">
            <div className="slider">
              <div className="slider__background">
                <div className="slider__background-filter"></div>
                <div className="slider__background-image">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSlideIndex}
                      src={`${
                        import.meta.env.VITE_BACK_HOST
                      }/static/files/images/content/${
                        currentSlide.backgroundURL
                      }`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      alt={currentSlide.title}
                    />
                  </AnimatePresence>
                </div>
              </div>
              <div className="slider__content">
                <div className="container wrapper">
                  <div
                    className="slide__information"
                    onMouseEnter={handleAutoPlayStop}
                    onMouseLeave={handleAutoPlayStart}
                  >
                    <div className="slide">
                      <AnimatePresence mode="wait">
                        <motion.h1
                          key={activeSlideIndex}
                          initial={{ opacity: 0, x: 4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.5 }}
                          className="slide__title"
                        >
                          {currentSlide.title}
                        </motion.h1>
                      </AnimatePresence>
                      <div className="slide__details">
                        <div className="slide__IMDb">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="icon IMDb" />
                            </motion.div>
                          </AnimatePresence>
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                              className="slide__IMDb-rating"
                            >
                              {currentSlide.IMDb.toFixed(1)}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSlideIndex}
                            initial={{ opacity: 0, x: 4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.5 }}
                          >
                            <span className="slide__splitter circle" />
                          </motion.div>
                        </AnimatePresence>
                        <div className="slide__additional">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                              className="slide__year"
                            >
                              {new Date(currentSlide.releaseDate).getFullYear()}
                            </motion.p>
                          </AnimatePresence>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                            >
                              <span className="slide__splitter" />
                            </motion.div>
                          </AnimatePresence>
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                              className="slide__duration"
                            >
                              {currentSlide.duration}
                            </motion.p>
                          </AnimatePresence>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                            >
                              <span className="slide__splitter" />
                            </motion.div>
                          </AnimatePresence>

                          <AnimatePresence mode="wait">
                            <motion.p
                              key={activeSlideIndex}
                              initial={{ opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.5 }}
                              className="slide__genre"
                            >
                              {currentSlide.genres?.[0]?.name}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={activeSlideIndex}
                          initial={{ opacity: 0, x: 4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.5 }}
                          className="slide__description"
                        >
                          {currentSlide.description}
                        </motion.p>
                      </AnimatePresence>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlideIndex}
                          initial={{ opacity: 0, x: 4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Link to={videoContentLink} className="slide__link">
                            Дивитись більше
                          </Link>
                        </motion.div>
                      </AnimatePresence>
                      <div className="slide__actions">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSlideIndex}
                            initial={{ opacity: 0, x: 4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.5 }}
                          >
                            <button
                              className="button light outline"
                              onClick={handleShowTrailer}
                            >
                              Трейлер
                            </button>
                          </motion.div>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSlideIndex}
                            initial={{ opacity: 0, x: 4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Link
                              to={`${videoContentLink}/watch`}
                              className="button icon g8 t-icon"
                            >
                              <div className="icon watch" />
                              Дивитися
                            </Link>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="slide__navigation">
                      <button
                        onClick={() => prevSlide()}
                        className="slide__navigation-button"
                      >
                        <div className="icon arrow left" />
                      </button>
                      <button
                        onClick={() => nextSlide()}
                        className="slide__navigation-button"
                      >
                        <div className="icon arrow right" />
                      </button>
                    </div>
                  </div>
                </div>
                <Slides
                  handleSetActiveSlideIndex={handleSetActiveSlideIndex}
                  slides={slides}
                />
              </div>
            </div>
            {isAdd && <TrailerPopUp trailer={trailerURL.current} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;
