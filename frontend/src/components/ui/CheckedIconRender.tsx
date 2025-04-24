import { cn } from '@/utils/cn.util';
import CheckedIcon from '../icons/CheckedIcon';

interface CheckedIconRenderProps {
  iconClassName?: string;
  checked: boolean;
}

const CheckedIconRender = ({ iconClassName = '', checked }: CheckedIconRenderProps) => {
  return (
    iconClassName &&
    (checked ? (
      <CheckedIcon className={cn(iconClassName)} />
    ) : (
      <div
        className={cn(
          'h-[34px] w-[34px] rounded-full border-[3px] border-black bg-transparent',
          iconClassName
        )}
      ></div>
    ))
  );
};

export default CheckedIconRender;
