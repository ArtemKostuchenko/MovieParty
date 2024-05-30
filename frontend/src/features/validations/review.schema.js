import * as yup from "yup";

const ReviewSchema = yup.object().shape({
  msg: yup
    .string()
    .min(3, "Повідомлення повинне бути більше 3 символів")
    .required("Повідомлення є обов'язковим"),
});

export default ReviewSchema;
