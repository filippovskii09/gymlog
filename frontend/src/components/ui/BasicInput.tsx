import classNames from 'classnames';
import {
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';
import InputLabel from './InputLabel';
import ShowPasswordEye from './ShowPasswordEye';

type InputProps = {
  label?: string;
  error?: string | null;
  type?: string;
  value?: string | number;
  inputMode?: string;
  maxLength?: number;
  wrapperClassName?: string;
  inputClassName?: string;
  onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const BasicInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, wrapperClassName, inputClassName, value, onChange, type = 'text', ...rest },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className={`relative w-full text-[16px] font-medium ${wrapperClassName}`}>
        {label && <InputLabel name={rest?.name} label={label} />}

        <div className={'relative'}>
          <input
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            value={value}
            inputMode={rest?.inputMode}
            onChange={onChange}
            onPaste={rest?.onPaste}
            onKeyDown={rest?.onKeyDown}
            maxLength={rest?.maxLength}
            className={classNames(
              'box-border w-full rounded-2xl border bg-white p-2.5 pl-4 text-black',
              error ? 'border-red-500' : 'border-gray-300',
              'focus:outline-[#896CFE]',
              inputClassName
            )}
            {...rest}
          />
          {isPassword && (
            <ShowPasswordEye showPassword={showPassword} setShowPassword={setShowPassword} />
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

BasicInput.displayName = 'BasicInput';

export default BasicInput;
