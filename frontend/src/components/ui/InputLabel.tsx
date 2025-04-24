import { cn } from '@/utils/cn.util';
import { FC } from 'react';

interface InputLabelProps {
  name: string | undefined;
  label: string;
  className?: string;
}

const InputLabel: FC<InputLabelProps> = ({ name, label, className }) => {
  return (
    <label htmlFor={name} className={cn('text-main-black mb-1 block', className)}>
      {label}
    </label>
  );
};

export default InputLabel;
