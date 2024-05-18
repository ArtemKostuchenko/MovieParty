import * as yup from "yup";

const TypeContentSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Назва типу' є обов'язковим"),
  path: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Шлях' є обов'язковим"),
});

export default TypeContentSchema;
