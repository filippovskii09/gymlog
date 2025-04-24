import { User } from '../models/User.model.js';

export class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email }).select('+password');
  }

  async findById(userId) {
    return User.findById(userId);
  }

  async create(userData) {
    return User.create(userData);
  }

  async updateRefreshToken(userId, refreshToken) {
    await User.findByIdAndUpdate(userId, { refreshToken });
  }

  async saveResetCode(userId, code, expiresAt) {
    await User.findByIdAndUpdate(
      userId,
      { resetCode: code, resetCodeExpiresAt: expiresAt },
      { new: true }
    );
  }

  async getResetCode(userId) {
    const user = await User.findById(userId).select('resetCode resetCodeExpiresAt');
    if (user && user.resetCode && user.resetCodeExpiresAt) {
      const expiresAt = new Date(user.resetCodeExpiresAt);

      if (expiresAt > new Date()) {
        return { code: user.resetCode, expiresAt };
      }
    }

    return null;
  }

  async updateUserFieldsById(userId, fields) {
    const allowedFields = Object.keys(User.schema.obj);
    const update = {};

    for (const key of Object.keys(fields)) {
      if (allowedFields.includes(key)) {
        update[key] = fields[key];
      } else {
        console.warn(`[UserRepository] Ignored unknown field: ${key}`);
      }
    }

    if (!Object.keys(update).length) {
      throw new Error('No valid fields provided for update');
    }

    await User.findByIdAndUpdate(userId, { $set: update }, { new: true });
  }

  async updatePassword(userId, hashedPassword) {
    await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  }

  async clearResetCode(userId) {
    await User.findByIdAndUpdate(userId, {
      $unset: { resetCode: '', resetCodeExpiresAt: '' },
    });
  }
}
