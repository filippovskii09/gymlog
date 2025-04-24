'use client';

import { ChildrenProps } from '@/types/interface.interface';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { BackArrowIcon } from '../icons/BackArrowIcon';

const BackButton: FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();

  return (
    <button className={'flex items-center gap-2 p-5'} onClick={() => router.back()}>
      <BackArrowIcon />
      {children}
    </button>
  );
};

export default BackButton;
