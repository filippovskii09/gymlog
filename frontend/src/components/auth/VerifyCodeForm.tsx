'use client';

import { BUTTON_TEXTS, ROUTES } from '@/constants/constants';
import { useUserVerifyCodeMutation } from '@/features/api/resetPasswordApi';
import { useAuthFormHandler } from '@/hooks/auth/useAuthFormHandler';
import useFallbackTimer from '@/hooks/useTimer';
import { verifyCodeSchema } from '@/schemas/registerSchema';
import { RootState } from '@/store/store';
import {
  VerifyCodeDto,
  VerifyCodeFormValues,
  VerifyCodeResponse,
} from '@/types/password-reset.interface';
import { FC, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import FollbackTimer from '../FollbackTimer/FollbackTimer';
import BasicButton from '../ui/BasicButton';
import OTPInput from './OtpInput';
import ResendOtpCodeButton from './ResendOtpCodeButton';

const VerifyCodeForm: FC = () => {
  const [trigger, { isLoading, isSuccess, isError, error }] = useUserVerifyCodeMutation();
  const email = useSelector((state: RootState) => state.auth.email) as string;
  const { isTimeout } = useFallbackTimer();
  const { handleSubmit, isSubmitting, buttonText, mutationError, setValue } = useAuthFormHandler<
    VerifyCodeFormValues,
    VerifyCodeResponse
  >({
    schema: verifyCodeSchema,
    mutation: () => {
      return [
        async (data: VerifyCodeFormValues) => {
          const result = await trigger({ ...data, email } as VerifyCodeDto).unwrap();
          return result;
        },
        { isLoading, isSuccess, isError, error },
      ] as const;
    },
    defaultButtonText: BUTTON_TEXTS.STATES.DEFAULT,
    onSuccessNavigate: ROUTES.AUTH.ENTER_NEW_PASS,
    isVerifyCode: true,
  });

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className="w-full">
      <div className={'mb-10 flex flex-col gap-5 bg-[#B3A0FF] px-5 py-8'}>
        <OTPInput onChange={(code) => setValue('code', code)} />
        {isTimeout ? <ResendOtpCodeButton /> : <FollbackTimer />}
        {mutationError && (
          <div className="text-sm text-red-600 text-center font-semibold flex items-center justify-center mx-auto">
            <span className="bg-red-200 py-2 px-8 my-4 rounded-xl">{mutationError}</span>
          </div>
        )}
      </div>

      <BasicButton buttonText={buttonText} type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default VerifyCodeForm;
