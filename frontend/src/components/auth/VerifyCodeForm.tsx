'use client';

import { BUTTON_TEXTS, ROUTES } from '@/constants/constants';
import { useUserVerifyCodeMutation } from '@/features/api/resetPasswordApi';
import { useAuthFormHandler } from '@/hooks/auth/useAuthFormHandler';
import { verifyCodeSchema } from '@/schemas/registerSchema';
import { VerifyCodeDto, VerifyCodeResponse } from '@/types/password-reset.interface';
import { FC, FormEvent, useState } from 'react';
import BasicButton from '../ui/BasicButton';
import OTPInput from './OtpInput';

const VerifyCodeForm: FC = () => {
  const [code, setCode] = useState<string>('');

  const { handleSubmit, submitError, buttonText, isSubmitting } = useAuthFormHandler<
    VerifyCodeDto,
    VerifyCodeResponse
  >({
    schema: verifyCodeSchema,
    mutation: () => {
      const [trigger, { isLoading, isSuccess, isError, error }] = useUserVerifyCodeMutation();
      return [
        async (data: VerifyCodeDto) => {
          const result = await trigger(data).unwrap();
          return result;
        },
        { isLoading, isSuccess, isError, error },
      ] as const;
    },
    defaultButtonText: BUTTON_TEXTS.STATES.DEFAULT,
    onSuccessNavigate: ROUTES.AUTH.LOGIN,
  });

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className="w-full">
      <div className={'mb-10 flex flex-col gap-5 bg-[#B3A0FF] px-5 py-8'}>
        <OTPInput onChange={(code) => setCode(code)} />
        {submitError && (
          <p className="mt-1 text-sm text-red-500 text-center font-medium">{submitError}</p>
        )}
      </div>

      <BasicButton buttonText={buttonText} type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default VerifyCodeForm;
