'use client';

import useCustomCheckbox from '@/hooks/useCustomCheckbox';
import { cn } from '@/utils/cn.util';
import { FC, memo, ReactNode } from 'react';
import CheckedIconRender from './CheckedIconRender';
import Subtitle from './Subtitle';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  type?: 'checkbox' | 'radio';
  containerClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
}

const CustomCheckbox: FC<CustomCheckboxProps> = memo(
  ({
    label,
    checked,
    onChange,
    type = 'radio',
    containerClassName = '',
    textClassName = '',
    iconClassName = '',
    children,
  }) => {
    const handleClick = useCustomCheckbox(checked, onChange, type);

    const content = children ?? <Subtitle className={textClassName} title={label} />;

    return (
      <button
        type="button"
        className={cn(
          'mx-auto flex w-full max-w-[323px] items-center justify-between transition-all',
          containerClassName
        )}
        role={type}
        aria-checked={checked}
        onClick={handleClick}
      >
        {content}
        <CheckedIconRender iconClassName={iconClassName} checked={checked} />
      </button>
    );
  }
);

export default CustomCheckbox;
