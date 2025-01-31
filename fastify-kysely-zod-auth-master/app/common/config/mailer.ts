import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmailNotification(email: string, todoTitle: string) {
    const mailOptions = {
        from: process.env.SMTP_USER, 
        to: email, 
        subject: "Доступ к задаче",
        text: `Вам был предоставлен доступ к задаче "${todoTitle}".`,
        html: `<p>Вам был предоставлен доступ к задаче <strong>${todoTitle}</strong>.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
}