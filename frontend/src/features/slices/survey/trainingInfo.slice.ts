import {
  AdditionalGoals,
  Equipment,
  Goals,
  SupportLevels,
  TrainingDays,
  TrainingPlaces,
  TrainingStyle,
  TrainingTime,
} from '@/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

type TrainingInfoValue<K extends keyof TrainingInfoState> = TrainingInfoState[K];

interface TrainingInfoState {
  goal: Goals;
  additionalGoal: AdditionalGoals;
  trainingPlaces: TrainingPlaces;
  equipment: Equipment;
  trainingTime: TrainingTime;
  trainingDays: TrainingDays;
  trainingStyle: TrainingStyle;
  supportLevel: SupportLevels;
}

const initialState: TrainingInfoState = {
  goal: '',
  additionalGoal: '',
  trainingPlaces: '',
  equipment: '',
  trainingTime: '',
  trainingDays: 0,
  trainingStyle: '',
  supportLevel: '',
};

const trainingInfoSlice = createSlice({
  name: 'trainingInfo',
  initialState,
  reducers: {
    setTrainingInfoItem: <K extends keyof TrainingInfoState>(
      state: TrainingInfoState,
      action: {
        payload: {
          key: K;
          value: TrainingInfoValue<K>;
        };
      }
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setTrainingInfoItem } = trainingInfoSlice.actions;

const trainingInfoReducer = trainingInfoSlice.reducer;
export default trainingInfoReducer;
