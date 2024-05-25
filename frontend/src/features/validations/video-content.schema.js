import * as yup from "yup";
import { getFileExtension } from "../utils/functions";

const youtubeURLPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const M3U8LinkSchema = yup.object().shape({
  quality: yup.string().required("Поле 'Якість' є обов'язковим"),
  m3u8URL: yup
    .string()
    .required("Поле 'Посилання' є обов'язковим")
    .matches(/\.m3u8$/, "Посилання має закінчуватися на .m3u8"),
});

const SoundTrackSchema = yup.object().shape({
  title: yup
    .string()
    .required("Поле 'Назва звукової доріжки' є обов'язковим")
    .min(3, "Поле повинно містити мінімум 3 символи"),
  m3u8Links: yup
    .array()
    .of(M3U8LinkSchema)
    .min(
      1,
      "Масив 'Посилань відео-якості звукової доріжки' повинен містити мінімум 1 елемент"
    ),
});

const PhotoValidation = (isEditField) =>
  yup
    .mixed()
    .test("fileRequired", "Оберіть фото", function (file) {
      const { [isEditField]: isEdit } = this.parent;
      if (isEdit) {
        return true;
      }
      return file && file.length > 0;
    })
    .test("isValidType", "Недопустимий формат файлу", function (file) {
      const { [isEditField]: isEdit } = this.parent;
      if ((!file || file.length === 0) && isEdit) return true;
      if (!file) return false;
      const isValidExt = ["webp", "png", "jpg"].includes(
        getFileExtension(file[0]?.name)
      );
      return isValidExt;
    });

const VideoContentSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Назва відеоконтенту' є обов'язковим"),
  originTitle: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Назва відеоконтенту (англійською)' є обов'язковим"),
  description: yup
    .string()
    .trim()
    .min(20, "Поле повинне бути більше 20 символів")
    .required("Поле 'Опис відеоконтенту' є обов'язковим"),
  typeVideoContent: yup
    .string()
    .required("Поле 'Тип відеоконтенту' є обов'язковим"),
  releaseDate: yup.date().required("Поле 'Дата народження' є обов'язковим"),
  duration: yup
    .string()
    .trim()
    .min(3, "Поле повинне бути більше 3 символів")
    .required("Поле 'Тривалість відеоконтенту' є обов'язковим"),
  trailerURL: yup
    .string()
    .required("Поле 'Трейлер відеоконтенту (YouTube)' є обов'язковим")
    .matches(youtubeURLPattern, "Введіть дійсне посилання на YouTube відео"),
  soundTracks: yup
    .array()
    .of(SoundTrackSchema)
    .min(1, "Додайте хоча б одну звукову доріжку"),
  previewURL: PhotoValidation("isEdit"),
  backgroundURL: PhotoValidation("isEdit"),
});

export default VideoContentSchema;
