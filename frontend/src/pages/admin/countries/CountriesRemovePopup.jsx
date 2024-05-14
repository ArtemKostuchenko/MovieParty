import React from "react";
import useCountry from "../../../hooks/useCountry";
import PopUp from "../../../components/PopUp/PopUp";

const CountriesRemovePopup = () => {
  const { removeId, resetHandler } = useCountry();

  if (!removeId) {
    return <></>;
  }

  return (
    <PopUp
      title="Видалення країни"
      open={Boolean(removeId)}
      setOpen={resetHandler}
    >
      <button className="button primary">Видалити</button>
    </PopUp>
  );
};

export default CountriesRemovePopup;
