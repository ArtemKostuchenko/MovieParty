import React from "react";
import useCountry from "../../../hooks/useCountry";
import usePopUp from "../../../hooks/usePopup";
import PopUp from "../../../components/PopUp/PopUp";
import { useGetCountryByIdQuery } from "../../../features/services/countries/countriesService";

const CountriesRemovePopup = () => {
  const { removeCountry, isLoadingRemove } = useCountry();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: country, isLoading } = useGetCountryByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення країни"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id, name } = country;

  const handleRemoveCountry = async () => {
    const res = await removeCountry(_id);
    console.log(res);
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Видалення країни"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити країну{" "}
          <span className="highlight">{name}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveCountry}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default CountriesRemovePopup;
