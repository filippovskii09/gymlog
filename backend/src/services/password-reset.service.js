import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { EMAIL_CONTENT } from '../constants/constants.js';
import { sendEmail } from '../helpers/email.helper.js';

export class PasswordResetService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  generateResetCode() {
    return crypto.randomInt(100000, 999999).toString();
  }

  async sendResetCode(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User with this email not found!');

    const resetCode = this.generateResetCode();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.userRepository.saveResetCode(user.id, resetCode, expiresAt);

    await sendEmail(
      email,
      'Code for resetting password, will live 15 minutes',
      EMAIL_CONTENT(resetCode)
    );
  }

  async verifyResetCode(email, code) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User with this email not found!');

    const validCode = await this.userRepository.getResetCode(user.id);

    if (!validCode || validCode.code !== code || validCode.expiresAt < new Date()) {
      throw new Error('Invalid or expired reset code!');
    }

    await this.userRepository.clearResetCode(user.id);

    const resetToken = jwt.sign({ userId: user.id }, config.RESET_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    return resetToken;
  }

  async resetPassword(resetToken, newPassword) {
    try {
      const decoded = jwt.verify(resetToken, config.RESET_TOKEN_SECRET);
      const userId = decoded.userId;

      const hashedPassword = await bcrypt.hash(newPassword, Number(config.SALT_ROUNDS));
      await this.userRepository.updatePassword(userId, hashedPassword);
    } catch (error) {
      console.error('Токен не дійсний або просрочений!', error);
      throw new Error(
        'Link for resetting password is invalid or expired! Try to reset password one more!'
      );
    }
  }
}
