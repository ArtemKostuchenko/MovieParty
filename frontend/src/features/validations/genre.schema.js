import * as yup from "yup";

const GenreSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Назва жанру' є обов'язковим"),
  originName: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Оригінальна назва' є обов'язковим"),
});

export default GenreSchema;
