import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

interface EmailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (transporter: Transporter, options: EmailOptions) => {
  try {
    await transporter.sendMail(options);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const sendEmail = async (
  email: string,
  subject: string,
  payload: any,
  template: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.EMAIL_HOST as string,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const htmlContent = compiledTemplate(payload);

    const options: EmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    };

    await sendMail(transporter, options);
    return "Email sent successfully!";
  } catch (error) {
    throw error;
  }
};

export { sendEmail };
