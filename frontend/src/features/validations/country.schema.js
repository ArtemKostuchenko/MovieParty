import * as yup from "yup";
import { getFileExtension } from "../utils/functions";

const CountrySchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Поле повинне бути більше 8 символів")
    .required("Поле 'Назва країни' є обов'язковим"),
  originName: yup
    .string()
    .min(3, "Поле повинне бути більше 8 символів")
    .required("Поле 'Оригінальна назва країни' є обов'язковим"),
  icon: yup
    .mixed()
    .test("fileRequired", "Оберіть іконку країни", function (file) {
      const { isEdit } = this.parent;
      if (isEdit) {
        return true;
      }

      return file && file.length > 0;
    })
    .test("isValidType", "Недопустимий формат файлу", function (file) {
      const { isEdit } = this.parent;
      if ((!file || file.length === 0) && isEdit) return true;
      const isValidExt = ["svg", "png", "jpg"].includes(
        getFileExtension(file[0]?.name)
      );
      return isValidExt;
    }),
});

export default CountrySchema;
