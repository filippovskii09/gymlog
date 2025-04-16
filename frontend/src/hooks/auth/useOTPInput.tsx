'use client';

import { ClipboardEvent, KeyboardEvent, useRef, useState } from 'react';

const useOTPInput = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < otpLength - 1) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, otpLength);
    if (pasted.length < otpLength) return;
    const updated = pasted.split('');
    setOtp(updated);
    updated.forEach((digit, idx) => {
      if (inputsRef.current[idx]) inputsRef.current[idx]!.value = digit;
    });
    inputsRef.current[otpLength - 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return {
    otp,
    setOtp,
    inputsRef,
    handleChange,
    handlePaste,
    handleKeyDown,
  };
};

export default useOTPInput;
