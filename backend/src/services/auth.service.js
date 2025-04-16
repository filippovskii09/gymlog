import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(email, password, name, username) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error('Invalid email!');

    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);

    return this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      username,
    });
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid email or password!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password!');

    const accessToken = this.generateAccessToken(user?.id);
    const refreshToken = this.generateRefreshToken(user?.id);

    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async logout(userId) {
    await this.userRepository.updateRefreshToken(userId, null);
  }

  async refreshToken(oldRefreshToken) {
    try {
      const decoded = jwt.verify(oldRefreshToken, config.REFRESH_TOKEN_SECRET);
      const user = await this.userRepository.findById(decoded.userId);

      if (!user || user.refreshToken !== oldRefreshToken) {
        throw new Error('Invalid refresh token!');
      }

      const newAccessToken = this.generateAccessToken(user.id);
      const newRefreshToken = this.generateRefreshToken(user.id);

      await this.userRepository.updateRefreshToken(user.id, newRefreshToken);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('refreshToken error:', error);
      throw new Error(error.message || 'Invalid refresh token!');
    }
  }

  generateAccessToken(userId) {
    return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(userId) {
    return jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
  }
}
