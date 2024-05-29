import React from "react";
import useFill from "../../hooks/useFill";

const Loader = () => {
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
