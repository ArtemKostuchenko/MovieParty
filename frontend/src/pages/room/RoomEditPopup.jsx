import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoomSchema } from "../../features/validations";
import { PopUp, DropDown, DropDownItem } from "../../components";
import useRoom from "../../hooks/useRoom";
import usePopUp from "../../hooks/usePopup";

const RoomEditPopup = () => {
  const {} = useRoom();
  return <div></div>;
};

export default RoomEditPopup;
