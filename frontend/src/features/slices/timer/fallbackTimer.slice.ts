import { createSlice } from '@reduxjs/toolkit';

interface StateI {
  minutes: number;
  seconds: number;
}

const initialState: StateI = {
  minutes: 4,
  seconds: 0,
};

const fallbackTimerslice = createSlice({
  name: 'fallbackTimer',
  initialState,
  reducers: {
    decrementSeconds: (state) => {
      state.seconds = state.seconds - 1;
    },
    decrementMinutes: (state) => {
      state.minutes = state.minutes - 1;
    },
    resetSeconds: (state) => {
      state.seconds = 59;
    },
    startTimer: (state) => {
      state.minutes = 4;
      state.seconds = 59;
    },
  },
});

export const { decrementSeconds, decrementMinutes, startTimer, resetSeconds } =
  fallbackTimerslice.actions;

const fallbackTimerReducer = fallbackTimerslice.reducer;
export default fallbackTimerReducer;
