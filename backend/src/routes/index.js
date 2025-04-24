import express from 'express';

import authRouter from './auth.route.js';
import passwordResetRouter from './password-reset.route.js';
import surveyRouter from './survey.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('', passwordResetRouter);
router.use('/survey', surveyRouter);

export default router;
