import { FC } from 'react';

import { ChildrenProps } from '@/types/interface.interface';
import PageLayout from './PageLayout';

const MainLayout: FC<ChildrenProps> = ({ children }) => {
  return (
    <PageLayout>
      <div className={'grow'}>{children}</div>
    </PageLayout>
  );
};

export default MainLayout;
