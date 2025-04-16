'use client';

import { useRefreshTokenQuery } from '@/features/api/authApi';
import { setAccessToken } from '@/features/slices/auth/auth.slice';
import { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useRefreshTokenOnMount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isSuccess } = useRefreshTokenQuery(undefined, { skip: false });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAccessToken(data.accessToken));
    }
  }, [data, isSuccess, dispatch]);
};

export default useRefreshTokenOnMount;
