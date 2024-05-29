import React from "react";
import NotFoundSvg from "../../assets/not-found-content.svg";

const NotFound = ({ title, description = "", image = "default" }) => {
  return (
    <div className="container cnt-mn">
      <div className="info f-c-h">
        <div className="info__container">
          <div className="info__image">
            {image === "default" && <img src={NotFoundSvg} alt={title} />}
          </div>
          <div className="info__title">{title}</div>
          <div className="info__description">
            {description
              ? description
              : "Якщо ви впевнені в цьому, то спробуйте пізніше, можливо це помилка розробника (малоймовірно)"}
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default NotFound;
