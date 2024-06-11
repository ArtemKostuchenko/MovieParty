import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import "./style.page.scss";
import { NotFound } from "../../components";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const errors = useRouteError();

  const { status } = errors;

  if (status === 404) {
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
  }

  return (
    <div className="not-found-page">
      <NotFound
        title="500 Внутрішня помилка сервера"
        description="Щось пішло не так, спробуйте будь-ласка пізніше"
        splitter={false}
      />
      <button className="button additional" onClick={() => navigate("/")}>
        На головну
      </button>
    </div>
  );
};

export default NotFoundPage;
