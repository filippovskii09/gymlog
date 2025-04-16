import { FC } from 'react';

interface AuthTitleProps {
  titleText: string;
}

const AuthTitle: FC<AuthTitleProps> = ({ titleText }) => {
  return (
    <h1
      className={
        'text-acid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold'
      }
    >
      {titleText}
    </h1>
  );
};

export default AuthTitle;
