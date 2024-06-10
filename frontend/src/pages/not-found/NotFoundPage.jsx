import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.page.scss";
import { NotFound } from "../../components";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <NotFound
        title="404 Сторінку не знайдено"
        description="Такої сторінки не існує чи вона є не доступною"
        splitter={false}
      />
      <button className="button additional" onClick={() => navigate("/")}>
        На головну
      </button>
    </div>
  );
};

export default NotFoundPage;
