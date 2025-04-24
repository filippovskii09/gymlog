import { FC } from 'react';
import { cn } from '../../../utils/cn.util';

interface Props {
  className?: string;
  title: string;
}

const Subtitle: FC<Props> = ({ title, className }) => {
  return <h2 className={cn('text-xl font-bold', className)}>{title}</h2>;
};

export default Subtitle;
