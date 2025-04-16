'use client';

import {
  decrementMinutes,
  decrementSeconds,
  resetSeconds,
  startTimer,
} from '@/features/slices/timer/fallbackTimer.slice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useFallbackTimer = (initialMinutes: number = 5) => {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { minutes, seconds } = useSelector((state: RootState) => state.fallbackTimer);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds === 0) {
        dispatch(decrementMinutes());
        dispatch(resetSeconds());
      }
      dispatch(decrementSeconds());
    }, 1000);

    if (minutes === 0 && seconds === 0) {
      setIsTimeout(true);
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [seconds, minutes]);

  useEffect(() => {
    dispatch(startTimer());
  }, []);

  return {
    minutes,
    seconds,
    isTimeout,
  };
};

export default useFallbackTimer;
