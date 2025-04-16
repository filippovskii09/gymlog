import PageLayout from './PageLayout';
import BackButton from '../ui/BackButton';
import { FC, ReactNode } from 'react';

type SetupProps = {
  title: string;
  text?: string;
  children?: ReactNode;
};

const SetupLayout: FC<SetupProps> = ({ title, text, children }) => {
  return (
    <PageLayout>
      <div className={'px-8'}>
        <BackButton>
          <p className={'text-acid font-semibold'}>Back</p>
        </BackButton>
      </div>
      <h1 className={'px-8 py-10 text-center text-2xl font-bold'}>{title}</h1>
      <p className={'mx-auto max-w-[328px] text-center'}>{text}</p>
      {children}
    </PageLayout>
  );
};

export default SetupLayout;
