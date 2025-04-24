import mongoose from 'mongoose';
import { USER_CONSTANTS } from '../../../shared/constants/user.js';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, select: false },

    resetCode: { type: String, select: false },
    resetCodeExpiresAt: { type: Date, index: true, select: false },

    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },

    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: USER_CONSTANTS.GENDERS,
      required: true,
    },

    height: { type: Number, required: true }, // см
    weight: { type: Number, required: true }, // кг

    contraindications: { type: [String], default: [] },
    restrictions: { type: [String], default: [] },

    fitnessLevels: {
      type: String,
      enum: USER_CONSTANTS.FITNESS_LEVELS,
      required: true,
    },

    numberOfRecentWorkouts: {
      type: String,
      enum: USER_CONSTANTS.RECENT_WORKOUTS,
      required: true,
    },

    trainingExperience: {
      type: [String],
      enum: USER_CONSTANTS.TRAINING_EXPERIENCE,
      required: true,
      default: [],
    },

    goal: {
      type: String,
      enum: USER_CONSTANTS.GOALS,
      required: true,
    },

    additionalGoal: {
      type: String,
      enum: USER_CONSTANTS.ADDITIONAL_GOALS,
    },

    trainingPlaces: {
      type: String,
      enum: USER_CONSTANTS.TRAINING_PLACES,
      required: true,
    },

    equipment: {
      type: [String],
      enum: USER_CONSTANTS.EQUIPMENT,
      required: true,
      default: [],
    },

    trainingTime: {
      type: String,
      enum: USER_CONSTANTS.TRAINING_TIME,
      required: true,
    },

    trainingDays: {
      type: Number,
      enum: USER_CONSTANTS.TRAINING_DAYS,
      required: true,
    },

    trainingStyle: {
      type: String,
      enum: USER_CONSTANTS.TRAINING_STYLE,
      required: true,
    },

    supportLevel: {
      type: String,
      enum: USER_CONSTANTS.SUPPORT_LEVELS,
      required: true,
    },
    isSurveyCompleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // без __v
  }
);

export const User = mongoose.model('User', UserSchema);
