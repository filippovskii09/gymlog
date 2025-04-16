import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	refreshToken: { type: String },
	resetCode: { type: String },
	resetCodeExpiresAt: { type: Date, index: true },
});

export const User = mongoose.model('User', UserSchema);
