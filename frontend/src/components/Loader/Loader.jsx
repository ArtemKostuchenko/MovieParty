import React from "react";
import useFill from "../../hooks/useFill";

const Loader = ({ fill = false }) => {
  if (fill) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="loader__container">
        <div className="loader"></div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default Loader;
