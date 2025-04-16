import express from 'express';

import { AuthController } from '../controllers/auth.controller.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AuthService } from '../services/auth.service.js';

const router = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Реєстрація користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішна реєстрація
 *       400:
 *         description: Помилка реєстрації
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Логін користувача
 *     tags: [Auth]
 *     description: >
 *       Після успішного логіну сервер відправляє `refreshToken` у httpOnly cookie,
 *       а також повертає `accessToken` та інформацію про користувача у відповіді.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішна авторизація
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie з refresh токеном
 *             schema:
 *               type: string
 *               example: refreshToken=abc.def.ghi; HttpOnly; Path=/; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Помилка авторизації
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Вихід користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний вихід
 *       400:
 *         description: Помилка виходу
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Оновлення токенів
 *     tags: [Auth]
 *     description: >
 *       Цей ендпоінт очікує `refreshToken` у cookies.
 *       Повертає новий `accessToken`, а також оновлює `refreshToken` в cookies.
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT Refresh Token зберігається в httpOnly cookie
 *     responses:
 *       200:
 *         description: Успішне оновлення токенів
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Новий access token
 *       400:
 *         description: Refresh токен відсутній або невалідний
 */
router.post('/refresh-token', authController.refreshToken);

export default router;
