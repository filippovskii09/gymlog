'use client';

import { BUTTON_TEXTS, ROUTES } from '@/constants/constants';
import { useUserForgotPasswordMutation } from '@/features/api/resetPasswordApi';
import { useAuthFormHandler } from '@/hooks/auth/useAuthFormHandler';
import { forgotPasswordSchema } from '@/schemas/registerSchema';
import { GenericMessageResponse } from '@/types/auth.intarface';
import { ForgotPasswordDto } from '@/types/password-reset.interface';
import { FC, FormEvent } from 'react';
import BasicButton from '../ui/BasicButton';
import BasicInput from '../ui/BasicInput';

const ForgotPasswordForm: FC = () => {
  const { register, handleSubmit, errors, isSubmitting, buttonText, submitError } =
    useAuthFormHandler<ForgotPasswordDto, GenericMessageResponse>({
      schema: forgotPasswordSchema,
      mutation: () => {
        const [trigger, { isLoading, isSuccess, isError, error }] = useUserForgotPasswordMutation();
        return [
          async (data: ForgotPasswordDto) => {
            const result = await trigger(data).unwrap();
            return result;
          },
          { isLoading, isSuccess, isError, error },
        ] as const;
      },
      defaultButtonText: BUTTON_TEXTS.STATES.DEFAULT,
      onSuccessNavigate: ROUTES.AUTH.VERIFY_CODE,
      isForgotPassword: true,
    });

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className="w-full">
      <div className={'mb-10 flex flex-col gap-5 bg-[#B3A0FF] px-10 py-8'}>
        <BasicInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message || submitError}
        />
      </div>

      <BasicButton buttonText={buttonText} type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default ForgotPasswordForm;
