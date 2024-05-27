import React from "react";
import "./style.component.scss";

const Skeleton = ({ width = "100%", height = "100%" }) => {
  return <div className="skeleton" style={{ width, height }}></div>;
};

export default Skeleton;
