import express from "express";

import { AuthController } from '../controllers/auth.controller.js';
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "../services/auth.service.js";

const router = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
