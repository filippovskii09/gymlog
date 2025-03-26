import nodemailer from "nodemailer";
import { config } from "../config/index.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.EMAIL_USER,
		pass: config.EMAIL_PASS
	}
});

export async function sendEmail(to, subject, text) {
	try {
		await transporter.sendMail({ 
			from: config.EMAIL_USER,
			to,
			subject,
			text 
		});
	} catch (error) {
		console.error("Помилка надсилання листа:", error);
		throw new Error("Не вдалося надіслати лист");
	}
}
