import React from "react";
import "./style.page.scss";
import { FavoriteItems } from "../../../components";

const FavoritePage = () => {
  return (
    <>
      <div className="profile-user-content-title">Збережене</div>
      <div className="profile-user-content-container">
        <FavoriteItems />
      </div>
    </>
  );
};

export default FavoritePage;
