'use client';

import { useEffect, useState } from 'react';

export const useResetToken = () => {
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const foundToken = params.get('token');
    setResetToken(foundToken);
  }, []);

  return resetToken;
};
