import React, { useState } from "react";
import "./style.page.scss";
import TypeContentList from "../../../components/TypesContent/TypeContentList";

const TypeContentPage = () => {
  const [name, setName] = useState("");

  const handleSearch = (e) => {
    const timer = setTimeout(() => {
      setName(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };
  return (
    <>
      <div className="profile-user-content-title">Тип контенту</div>
      <div className="profile-user-content-container">
        <div className="typeContent">
          <div className="view">
            <div className="view-actions">
              <button className="button primary">Додати тип</button>
              <div className="view-filters">
                <div className="form">
                  <div className="form__item">
                    <div className="form__input__icon g8">
                      <div className="icon find" />
                      <input
                        type="text"
                        placeholder="Пошук..."
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TypeContentList limit={8} name={name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TypeContentPage;
