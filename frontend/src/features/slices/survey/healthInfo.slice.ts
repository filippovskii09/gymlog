import { FitnessLevel, RecentWorkout, TrainingExperience } from '@/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface HealthInfoState {
  contraindications: string;
  restrictions: string;
  fitnessLevels: FitnessLevel;
  numberOfRecentWorkouts: RecentWorkout;
  trainingExperience: TrainingExperience;
}

const initialState: HealthInfoState = {
  contraindications: '',
  restrictions: '',
  fitnessLevels: '',
  numberOfRecentWorkouts: '',
  trainingExperience: '',
};

const healthInfoSlice = createSlice({
  name: 'healthInfo',
  initialState,
  reducers: {
    setHealthInfoItem: (
      state,
      action: { payload: { key: keyof HealthInfoState; value: string } }
    ) => {
      const { key, value } = action.payload;
      if (key in state) {
        (state as HealthInfoState)[key] = value;
      }
    },
    resetHealthInfo: () => initialState,
  },
});

export const { setHealthInfoItem, resetHealthInfo } = healthInfoSlice.actions;

const healthInfoReducer = healthInfoSlice.reducer;
export default healthInfoReducer;
