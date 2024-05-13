import * as yup from "yup";
import { getFileExtension } from "../utils/functions";

const CountrySchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Поле повинне бути більше 8 символів")
    .required("Поле 'Назва країни' є обов'язковим"),
  originalName: yup
    .string()
    .min(3, "Поле повинне бути більше 8 символів")
    .required("Поле 'Оригінальна назва країни' є обов'язковим"),
  countryIcon: yup
    .mixed()
    .required("Оберіть іконку країни")
    .test("isValidType", (file, context) => {
      const isValidExt = ["svg", "png", "jpg"].includes(
        getFileExtension(file[0]?.name)
      );
      if (!isValidExt) context?.createError();
      return isValidExt;
    }),
});

export default CountrySchema;
