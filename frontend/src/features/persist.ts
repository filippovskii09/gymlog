import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth/auth.slice';
import generalInfoReducer from './slices/survey/generallnfo.slice';
import healthInfoReducer from './slices/survey/healthInfo.slice';
import trainingInfoReducer from './slices/survey/trainingInfo.slice';
import fallbackTimerReducer from './slices/timer/fallbackTimer.slice';
import userReducer from './slices/user/user.slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'email'],
};

export const persistedAuthInfo = persistReducer(authPersistConfig, authReducer);

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
};

export const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const fallbackTimerPersistConfig = {
  key: 'fallbackTimer',
  storage,
  whitelist: ['minutes', 'seconds'],
};

export const persistedFallbackTimer = persistReducer(
  fallbackTimerPersistConfig,
  fallbackTimerReducer
);

const generalInfoPersistConfig = {
  key: 'generalInfo',
  storage,
  whitelist: ['age', 'gender', 'height', 'weight'],
};

export const persistedGeneralInfo = persistReducer(generalInfoPersistConfig, generalInfoReducer);

const healthInfoPersistConfig = {
  key: 'healthInfo',
  storage,
  whitelist: [
    'contraindications',
    'restrictions',
    'fitnessLevels',
    'numberOfRecentWorkouts',
    'trainingExperience',
  ],
};

export const persistedHealthInfo = persistReducer(healthInfoPersistConfig, healthInfoReducer);

const trainingInfoPersistConfig = {
  key: 'trainingInfo',
  storage,
  whitelist: [
    'goal',
    'additionalGoal',
    'trainingPlaces',
    'equipment',
    'trainingTime',
    'trainingDays',
    'trainingStyle',
    'supportLevel',
  ],
};

export const persistedTrainingInfo = persistReducer(trainingInfoPersistConfig, trainingInfoReducer);

export const clearSurveyStorage = async () => {
  await storage.removeItem('persist:generalInfo');
  await storage.removeItem('persist:healthInfo');
  await storage.removeItem('persist:trainingInfo');
};
