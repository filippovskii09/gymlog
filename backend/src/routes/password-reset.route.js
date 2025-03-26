import express from "express";

import { PasswordResetController } from "../controllers/password-reset.controller.js";
import { UserRepository } from "../repositories/user.repository.js";
import { PasswordResetService } from "../services/password-reset.service.js";

const router = express.Router();

const userRepository = new UserRepository();
const passwordResetService = new PasswordResetService(userRepository);
const passwordResetController = new PasswordResetController(passwordResetService);

router.post("/forgot-password", passwordResetController.requestReset);
router.post("/verify-reset-code", passwordResetController.verifyResetCode)
router.post("/set-new-password", passwordResetController.setNewPassword);


export default router;
