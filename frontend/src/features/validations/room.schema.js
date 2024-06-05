import * as yup from "yup";

const RoomSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Назва кімнати повинна бути більше 3 символів")
    .required("Назва кімнати є обов'язковою"),
  videoContentId: yup.string().required("Відеоконтент є обов'язковим"),
  isPublic: yup.bool().required("Доступність кімнати є обов'язковим"),
  maxNumberUsers: yup
    .number()
    .min(1)
    .max(20, "Кількість користувачів не повинна перевищувати 20"),
  voiceChat: yup.bool().required("Тип чату є обов'язковим"),
});

export default RoomSchema;
