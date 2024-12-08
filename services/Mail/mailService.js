import nodeMailer from 'nodemailer';
import { envService } from '../Env/envService.js';
const { MAIL_PROVIDER, MAIL_PORT, MAIL_HOST, MAIL_USER, MAIL_PASS } = envService;

const transporter = nodeMailer.createTransport({
    service: MAIL_PROVIDER,
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});

const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: MAIL_USER,
            to,
            subject,
            html
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export { sendMail };