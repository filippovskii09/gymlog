'use client';

import useRefreshTokenOnMount from '@/hooks/auth/useRefreshTokenOnMount';

const RefreshTokenInitializer = () => {
  useRefreshTokenOnMount();
  return null;
};

export default RefreshTokenInitializer;
