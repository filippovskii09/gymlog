import express from 'express';

import { PasswordResetController } from '../controllers/password-reset.controller.js';
import { UserRepository } from '../repositories/user.repository.js';
import { PasswordResetService } from '../services/password-reset.service.js';

const router = express.Router();

const userRepository = new UserRepository();
const passwordResetService = new PasswordResetService(userRepository);
const passwordResetController = new PasswordResetController(passwordResetService);

/**
 * @swagger
 * /password-resets:
 *   post:
 *     summary: Запит на відновлення паролю
 *     tags: [Reset Password]
 *     description: >
 *       Відправляє код для скидання пароля на електронну пошту користувача.
 *       Якщо користувач з вказаною електронною адресою існує — код буде надіслано.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Код для відновлення пароля відправлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Код надіслано на user@example.com
 *       400:
 *         description: Помилка при надсиланні коду
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Користувач не знайдений
 */
router.post('/password-resets', passwordResetController.requestReset);

/**
 * @swagger
 * /password-resets/verify:
 *   post:
 *     summary: Перевірка коду відновлення пароля
 *     tags: [Reset Password]
 *     description: >
 *       Перевіряє правильність коду для відновлення пароля, що був надісланий на email.
 *       Якщо код правильний, повертає тимчасовий `resetToken`, який використовується для зміни пароля.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Код підтверджено, повернуто токен для скидання пароля
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resetToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Невірний код або email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Код не дійсний або вже використаний
 */
router.post('/password-resets/verify', passwordResetController.verifyResetCode);

/**
 * @swagger
 * /password-resets:
 *   patch:
 *     summary: Встановлення нового пароля
 *     tags: [Reset Password]
 *     description: >
 *       Встановлює новий пароль для користувача після підтвердження коду.
 *       Потребує дійсний `resetToken`, отриманий з попереднього кроку.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - newPassword
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *                 example: NewStrongPassword123
 *     responses:
 *       200:
 *         description: Пароль успішно змінено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пароль успішно змінено!
 *       400:
 *         description: Помилка під час зміни пароля
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Токен недійсний або прострочений
 */
router.patch('/password-resets', passwordResetController.setNewPassword);

export default router;
