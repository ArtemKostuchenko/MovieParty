import * as yup from "yup";
import { getFileExtension } from "../utils/functions";

const PersonSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, "Поле повинне бути більше 2 символів")
    .required("Поле 'Ім`я' є обов'язковим"),
  lastName: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Прізвище' є обов'язковим"),
  firstNameEng: yup
    .string()
    .trim()
    .min(2, "Поле повинне бути більше 2 символів")
    .required("Поле 'Ім`я (англійською)' є обов'язковим"),
  lastNameEng: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Прізвище (англійською)' є обов'язковим"),
  dateBirth: yup.date().required("Поле 'Дата народження' є обов'язковим"),
  dateDeath: yup.date(),
  placeBirth: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Місце народження' є обов'язковим"),
  photoURL: yup
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
});

export default PersonSchema;
