import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть правильну електронну пошту")
    .required("Поле 'Електронна пошта' є обов'язковим"),
  nickname: yup
    .string()
    .min(5, "Нікнейм повинен бути більше 8 символів")
    .required("Поле 'Нікнейм' є обов'язковим"),
  password: yup
    .string()
    .min(8, "Пароль повинен бути більше 8 символів")
    .max(32, "Пароль повинен бути менше 32 символів")
    .required("Поле 'Пароль' є обов'язковим"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Паролі повинні співпадати")
    .required("Поле 'Повторіть пароль' є обов'язковим"),
});

export default RegisterSchema;
