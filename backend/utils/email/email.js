const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

const sendMail = async (transporter, options) => {
    try {
        await transporter.sendMail(options);
        console.log('Mail is sent!');
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const htmlContent = compiledTemplate(payload);

        const options = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: htmlContent,
        };

        await sendMail(transporter, options);
        return 'Email sent successfully!';
    } catch (error) {
        throw error;
    }
};

module.exports = { sendEmail };
