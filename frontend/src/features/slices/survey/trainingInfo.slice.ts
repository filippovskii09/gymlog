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
    setTrainingInfoItem: (
      state,
      action: { payload: { key: keyof TrainingInfoState; value: string } }
    ) => {
      const { key, value } = action.payload;
      if (key in state) {
        (state as TrainingInfoState)[key] = value;
      }
    },
  },
});

export const { setTrainingInfoItem } = trainingInfoSlice.actions;

const trainingInfoReducer = trainingInfoSlice.reducer;
export default trainingInfoReducer;
