import * as yup from "yup";

const BestListSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Назва списку' є обов'язковим"),
});

export default BestListSchema;
