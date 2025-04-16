import { FC } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.util';

type Props = {
  buttonText: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  redirectPath?: string;
  className?: string;
};

const BasicButton: FC<Props> = ({
  buttonText,
  disabled = false,
  type = 'button',
  redirectPath,
  className,
}) => {
  return redirectPath ? (
    <Link
      to={redirectPath}
      className={cn(
        'bg-grey group relative mx-auto flex h-11 w-full min-w-48 max-w-[300px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-white p-2.5 text-center text-lg font-bold transition-all duration-200 hover:opacity-100 lg:opacity-70',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <ButtonContent buttonText={buttonText} />
    </Link>
  ) : (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'bg-grey group relative mx-auto flex h-11 w-full min-w-48 max-w-[300px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-white p-2.5 text-center text-lg font-bold transition-all duration-200 hover:opacity-100 lg:opacity-70',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <ButtonContent buttonText={buttonText} />
    </button>
  );
};

const ButtonContent: FC<{ buttonText: string }> = ({ buttonText }) => (
  <>
    <p className="absolute left-1/2 -translate-x-1/2 -translate-y-[150%] opacity-20 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      {buttonText}
    </p>
    <p className="absolute left-1/2 -translate-x-1/2 translate-y-0 opacity-70 transition-all duration-300 group-hover:translate-y-[150%]">
      {buttonText}
    </p>
  </>
);

export default BasicButton;
