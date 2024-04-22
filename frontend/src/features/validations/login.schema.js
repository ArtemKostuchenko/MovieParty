import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть правильну електронну пошту")
    .required("Поле 'Електронна пошта' є обов'язковим"),
  password: yup
    .string()
    .min(8, "Пароль повинен бути більше 8 символів")
    .max(32, "Пароль повинен бути менше 32 символів")
    .required("Поле 'Пароль' є обов'язковим"),
});

export default LoginSchema;
