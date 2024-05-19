import * as yup from "yup";

const SelectionSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Назва підбірки' є обов'язковим"),
  description: yup
    .string()
    .min(30, "Поле повинне бути більше 30 символів")
    .required("Поле 'Опис підбірки' є обов'язковим"),
});

export default SelectionSchema;
