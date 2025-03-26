import { User } from "../models/User.model.js";

export class UserRepository {
	async findByEmail(email) {
		return User.findOne({ email });
	}

	async create(userData) {
		return User.create(userData);
	}

	async updateRefreshToken(userId, refreshToken) {
		await User.findByIdAndUpdate(userId, { refreshToken });
	}

	async saveResetCode(userId, code, expiresAt) {
		await User.findByIdAndUpdate(userId, { resetCode: code, resetCodeExpiresAt: expiresAt }, { new: true });
	}

	async getResetCode(userId) {
		const user = await User.findById(userId).select("resetCode resetCodeExpiresAt");
		if (user && user.resetCode && user.resetCodeExpiresAt) {
			const expiresAt = new Date(user.resetCodeExpiresAt);

			if (expiresAt > new Date()) {
				return { code: user.resetCode, expiresAt };
			}
		}

		return null;
	}

	async updatePassword(userId, hashedPassword) {
		await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
	}

	async clearResetCode(userId) {
		await User.findByIdAndUpdate(userId, { $unset: { resetCode: "", resetCodeExpiresAt: "" } });
	}
}
