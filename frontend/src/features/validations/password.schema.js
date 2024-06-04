import * as yup from "yup";

const PasswordSchema = yup.object().shape({
  password: yup.string().trim().min(8, "Пароль повинен бути більше 3 символів"),
  newPassword: yup
    .string()
    .trim()
    .min(8, "Пароль повинен бути більше 3 символів"),
});

export default PasswordSchema;
