'use client';

import { BUTTON_TEXTS, ROUTES } from '@/constants/constants';
import { useUserNewPasswordMutation } from '@/features/api/resetPasswordApi';
import { useAuthFormHandler } from '@/hooks/auth/useAuthFormHandler';
import { useResetToken } from '@/hooks/useResetToken';
import { userNewPasswordSchema } from '@/schemas/registerSchema';
import { GenericMessageResponse } from '@/types/auth.intarface';
import { NewPasswordDto } from '@/types/password-reset.interface';
import { FC, FormEvent } from 'react';
import BasicButton from '../ui/BasicButton';
import BasicInput from '../ui/BasicInput';

const NewPasswordForm: FC = () => {
  const [trigger, { isLoading, isSuccess, isError, error }] = useUserNewPasswordMutation();

  const resetToken = useResetToken();

  const { register, handleSubmit, errors, isSubmitting, buttonText, submitError } =
    useAuthFormHandler<NewPasswordDto, GenericMessageResponse>({
      schema: userNewPasswordSchema,
      mutation: () => {
        return [
          async (data: NewPasswordDto) => {
            if (!resetToken) throw new Error('Reset token not found');
            const result = await trigger({ ...data, resetToken }).unwrap();
            return result;
          },
          { isLoading, isSuccess, isError, error },
        ] as const;
      },
      defaultButtonText: BUTTON_TEXTS.AUTH.RESET_PASSWORD,
      onSuccessNavigate: ROUTES.AUTH.LOGIN,
    });

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className="w-full">
      <div className={'mb-10 flex flex-col gap-5 bg-[#B3A0FF] px-10 py-8'}>
        <BasicInput
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          {...register('newPassword')}
          error={errors.newPassword?.message || submitError}
        />
      </div>

      {submitError ? (
        <BasicButton
          redirectPath={ROUTES.AUTH.FORGOT_PASSWORD}
          buttonText={'Відновити пароль ще раз!'}
        />
      ) : (
        <BasicButton buttonText={buttonText} type="submit" disabled={isSubmitting} />
      )}
    </form>
  );
};

export default NewPasswordForm;
