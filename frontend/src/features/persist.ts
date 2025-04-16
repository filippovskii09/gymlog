import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth/auth.slice';
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
