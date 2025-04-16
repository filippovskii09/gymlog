import { FC, ReactNode } from 'react';
import AuthTitle from '../auth/AuthTitle';
import BackButton from '../ui/BackButton';
import PageLayout from './PageLayout';

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
  bottomText?: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ title, children, bottomText }) => {
  return (
    <PageLayout>
      <div className="max-w-xl mx-auto w-full">
        <div className="relative flex flex-wrap items-center px-4">
          <BackButton />
          <AuthTitle titleText={title} />
        </div>
        {children}
      </div>
      {bottomText && <p className="px-4 py-7 text-center text-base">{bottomText}</p>}
    </PageLayout>
  );
};

export default AuthLayout;
