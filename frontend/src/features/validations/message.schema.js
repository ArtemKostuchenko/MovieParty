import * as yup from "yup";

const MessageSchema = yup.object().shape({
  message: yup.string().required(),
});

export default MessageSchema;
