import express from 'express';

import { SurveyController } from '../controllers/survey.controller.js';
import { UserRepository } from '../repositories/user.repository.js';
import { SurveyService } from '../services/survey.service.js';

const router = express.Router();

const userRepository = new UserRepository();
const surveyService = new SurveyService(userRepository);
const surveyController = new SurveyController(surveyService);

/**
 * @swagger
 * /survey/general:
 *   post:
 *     summary: Додає загальну інформацію користувача для опитування
 *     tags:
 *       - Survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - age
 *               - gender
 *               - height
 *               - weight
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               age:
 *                 type: integer
 *                 example: 30
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: male
 *               height:
 *                 type: number
 *                 format: float
 *                 example: 180.5
 *               weight:
 *                 type: number
 *                 format: float
 *                 example: 75.2
 *     responses:
 *       200:
 *         description: Інформація успішно додана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: General info for survey added successfully!!!
 *       400:
 *         description: Помилка під час обробки запиту
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */
router.post('/general', surveyController.getGeneralSurveyInfo);

/**
 * @swagger
 * /survey/health:
 *   post:
 *     summary: Додати/оновити інформацію про здоров’я користувача
 *     tags:
 *       - Survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraindications
 *               - fitnessLevels
 *               - numberOfRecentWorkouts
 *               - trainingExperience
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               contraindications:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Гіпертонія", "Астма"]
 *               fitnessLevels:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 example: intermediate
 *               numberOfRecentWorkouts:
 *                 type: string
 *                 enum: [none, 1-2, 3-4, 5+]
 *                 example: 3-4
 *               restrictions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Без бігу", "Без присідань"]
 *               trainingExperience:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Йога", "Силові тренування"]
 *     responses:
 *       200:
 *         description: Успішне збереження здоров'я користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Health info for survey added successfully!!!
 *       400:
 *         description: Помилка запиту або сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email is required
 */
router.post('/health', surveyController.getHealthSurveyInfo);

/**
 * @swagger
 * /survey/training:
 *   post:
 *     summary: Додає інформацію про тренування в опитуванні користувача
 *     tags:
 *       - Survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - goal
 *               - trainingPlaces
 *               - equipment
 *               - trainingDays
 *               - trainingTime
 *               - trainingStyle
 *               - supportLevel
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               goal:
 *                 type: string
 *                 example: "Lose weight"
 *               additionalGoal:
 *                 type: string
 *                 example: "Improve endurance"
 *               trainingPlaces:
 *                 type: string
 *                 example: "Home"
 *               equipment:
 *                 type: string
 *                 example: "Dumbbells, Resistance bands"
 *               trainingDays:
 *                 type: integer
 *                 example: 4
 *               trainingTime:
 *                 type: string
 *                 example: "Morning"
 *               trainingStyle:
 *                 type: string
 *                 example: "HIIT"
 *               supportLevel:
 *                 type: string
 *                 example: "Full support"
 *     responses:
 *       200:
 *         description: Інформацію успішно збережено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Training info for survey added successfully!!!
 *       400:
 *         description: Помилка під час обробки запиту
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input or user not found
 */
router.post('/training', surveyController.getTrainingSurveyInfo);

export default router;
