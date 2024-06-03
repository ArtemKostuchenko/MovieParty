import * as yup from "yup";

const PersonalSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Нікнейм' є обов'язковим"),
  email: yup
    .string()
    .email("Вкажіть правильну електронну пошту")
    .required("Поле 'Електронна пошта' є обов'язковим"),
  country: yup.string(),
  sex: yup.string(),
});

export default PersonalSchema;
