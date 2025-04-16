'use client';

import useOTPInput from '@/hooks/auth/useOTPInput';
import { ChangeEvent, FC, KeyboardEvent, useEffect } from 'react';
import BasicInput from '../ui/BasicInput';

interface OTPInputProps {
  onChange: (code: string) => void;
}

const OTPInput: FC<OTPInputProps> = ({ onChange }) => {
  const { otp, inputsRef, handleChange, handlePaste, handleKeyDown } = useOTPInput();

  useEffect(() => {
    onChange(otp.join(''));
  }, [otp, onChange]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex gap-2">
        {otp.map((_, index) => (
          <BasicInput
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el: HTMLInputElement | null) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
            onPaste={handlePaste}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
            inputClassName="h-12 !w-10 !p-0 text-center !rounded appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
