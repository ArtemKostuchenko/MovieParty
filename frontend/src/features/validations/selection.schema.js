import * as yup from "yup";
import { getFileExtension } from "../utils/functions";

const SelectionSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Поле повинне бути більше 4 символів")
    .required("Поле 'Назва підбірки' є обов'язковим"),
  description: yup
    .string()
    .min(30, "Поле повинне бути більше 30 символів")
    .required("Поле 'Опис підбірки' є обов'язковим"),
  previewURL: yup
    .mixed()
    .test("fileRequired", "Оберіть фото", function (file) {
      const { isEdit } = this.parent;
      if (isEdit) {
        return true;
      }
      return file && file.length > 0;
    })
    .test("isValidType", "Недопустимий формат файлу", function (file) {
      const { isEdit } = this.parent;
      if ((!file || file.length === 0) && isEdit) return true;
      if (!file) return false;
      const isValidExt = ["webp", "png", "jpg"].includes(
        getFileExtension(file[0]?.name)
      );
      return isValidExt;
    }),
  videoContents: yup.array().min(1, "Додайте хоча б один відеоконтент"),
});

export default SelectionSchema;
