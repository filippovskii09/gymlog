'use client';

import { useUserForgotPasswordMutation } from '@/features/api/resetPasswordApi';
import { RootState } from '@/store/store';
import { FormEvent } from 'react';
import { useSelector } from 'react-redux';

const ResendOtpCodeButton = () => {
  const [userForgotPassword, { isLoading, isSuccess }] = useUserForgotPasswordMutation();
  const email = useSelector((state: RootState) => state.auth.email) as string;

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await userForgotPassword({ email }).unwrap();
    } catch (error) {
      console.log('Error resending OTP code:', error);
    }
  };

  return (
    <button type="button" onClick={(e) => handleSubmit(e)} disabled={isLoading}>
      {isSuccess ? 'Code sended' : 'Resend Code'}
    </button>
  );
};

export default ResendOtpCodeButton;
