import { Gender } from '@/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

export interface GeneralInfoState {
  age: string;
  gender: Gender;
  height: number;
  weight: number;
}

const initialState: GeneralInfoState = {
  age: '',
  gender: '',
  height: 0,
  weight: 0,
};

const generalInfoSlice = createSlice({
  name: 'generalInfo',
  initialState,
  reducers: {
    setGeneralInfoItem: (
      state,
      action: { payload: { key: keyof GeneralInfoState; value: string | number | Gender } }
    ) => {
      const { key, value } = action.payload;
      if (key in state) {
        (state as GeneralInfoState)[key] = value as never;
      }
    },
    resetGeneralInfo: () => initialState,
  },
});

export const { setGeneralInfoItem, resetGeneralInfo } = generalInfoSlice.actions;

const generalInfoReducer = generalInfoSlice.reducer;
export default generalInfoReducer;
