import React from "react";
import useFill from "../../hooks/useFill";

const Loader = ({ fill = false, fixed = false }) => {
  if (fixed) {
    return (
      <div className="loader__fixed">
        <div className="loader"></div>
      </div>
    );
  }
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
