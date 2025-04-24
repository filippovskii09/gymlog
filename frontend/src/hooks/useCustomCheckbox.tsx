'use client';

import { useCallback } from 'react';

const useCustomCheckbox = (
  checked: boolean,
  onChange: (checked: boolean) => void,
  type: 'checkbox' | 'radio'
) => {
  const handleClick = useCallback(() => {
    if (type === 'radio' && checked) return;
    onChange(true);
  }, [checked, onChange, type]);

  return handleClick;
};

export default useCustomCheckbox;
