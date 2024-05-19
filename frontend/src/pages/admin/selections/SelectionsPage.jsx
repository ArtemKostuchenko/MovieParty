import React, { useState } from "react";
import "./style.page.scss";
import { SelectionList } from "../../../components";
import SelectionsAddPopup from "./SelectionsAddPopup";
import SelectionsEditPopup from "./SelectionsEditPopup";
import SelectionsRemovePopup from "./SelectionsRemovePopup";
import useSelection from "../../../hooks/useSelection";
import usePopup from "../../../hooks/usePopup";

const SelectionsPage = () => {
  const { isLoadingAdd } = useSelection();
  const { isAdd, removeId, editId, handleAddPopUp } = usePopup();
  const [name, setName] = useState("");

  const handleSearch = (e) => {
    const timer = setTimeout(() => {
      setName(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="profile-user-content-title">Підбірки</div>
      <div className="profile-user-content-container">
        <div className="best-lists">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isAdd || isLoadingAdd}
                onClick={() => handleAddPopUp()}
              >
                Додати підбірку
              </button>
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
            <SelectionList limit={8} name={name} />
          </div>
        </div>
      </div>
      {isAdd && <SelectionsAddPopup />}
      {editId && <SelectionsEditPopup />}
      {removeId && <SelectionsRemovePopup />}
    </>
  );
};

export default SelectionsPage;
