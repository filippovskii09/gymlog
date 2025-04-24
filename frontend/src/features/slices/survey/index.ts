import {
  persistedGeneralInfo,
  persistedHealthInfo,
  persistedTrainingInfo,
} from '@/features/persist';
import { combineReducers } from '@reduxjs/toolkit';

const survayReducer = combineReducers({
  generalInfo: persistedGeneralInfo,
  healthInfo: persistedHealthInfo,
  trainingInfo: persistedTrainingInfo,
});

export default survayReducer;
