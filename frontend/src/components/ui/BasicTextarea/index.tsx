'use client';

import classNames from 'classnames';
import {
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  KeyboardEvent,
  TextareaHTMLAttributes,
} from 'react';
import InputLabel from '../InputLabel';

type TextareaProps = {
  label?: string;
  error?: string | null;
  value?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  onPaste?: (e: ClipboardEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

const BasicTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, wrapperClassName, inputClassName, labelClassName, value, onChange, ...rest },
    ref
  ) => {
    return (
      <div className={`relative w-full text-[16px] font-medium ${wrapperClassName}`}>
        {label && <InputLabel className={labelClassName} name={rest?.name} label={label} />}

        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onPaste={rest?.onPaste}
          onKeyDown={rest?.onKeyDown}
          className={classNames(
            'box-border w-full rounded-2xl border bg-white p-2.5 pl-4 text-black resize-none',
            error ? 'border-red-500' : 'border-gray-300',
            'focus:outline-[#896CFE]',
            inputClassName
          )}
          {...rest}
        />

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default BasicTextarea;
