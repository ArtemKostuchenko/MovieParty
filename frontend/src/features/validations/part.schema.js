import * as yup from "yup";

const PartSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Назва частини' є обов'язковим"),
});

export default PartSchema;
