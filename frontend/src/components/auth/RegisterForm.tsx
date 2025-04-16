'use client';

import { BUTTON_TEXTS, ROUTES } from '@/constants/constants';
import { useUserRegisterMutation } from '@/features/api/authApi';
import { useAuthFormHandler } from '@/hooks/auth/useAuthFormHandler';
import { registerSchema } from '@/schemas/registerSchema';
import { GenericMessageResponse, RegisterDto } from '@/types/auth.intarface';
import { FC } from 'react';
import BasicButton from '../ui/BasicButton';
import BasicInput from '../ui/BasicInput';

const RegisterForm: FC = () => {
  const { register, handleSubmit, errors, isSubmitting, buttonText, mutationError } =
    useAuthFormHandler<RegisterDto, GenericMessageResponse>({
      schema: registerSchema,
      mutation: () => {
        const [trigger, { isLoading, isSuccess, isError, error }] = useUserRegisterMutation();
        return [
          async (data: RegisterDto) => {
            const result = await trigger(data).unwrap();
            return result;
          },
          { isLoading, isSuccess, isError, error },
        ] as const;
      },
      defaultButtonText: BUTTON_TEXTS.AUTH.SIGN_UP,
      onSuccessNavigate: ROUTES.AUTH.LOGIN,
    });

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={'mb-10 flex flex-col gap-5 bg-[#B3A0FF] px-10 py-16'}>
        <BasicInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
        />
        <BasicInput
          label="Name"
          type="text"
          placeholder="Enter your name"
          {...register('name')}
          error={errors.name?.message}
        />
        <BasicInput
          label="Username"
          type="text"
          placeholder="Enter username"
          {...register('username')}
          error={errors.username?.message}
        />
        <BasicInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
      {mutationError && (
        <div className="text-sm text-red-600 text-center font-semibold flex items-center justify-center mx-auto">
          <span className="bg-red-200 py-2 px-8 my-4 rounded-xl">{mutationError}</span>
        </div>
      )}

      <BasicButton buttonText={buttonText} type="submit" disabled={isSubmitting} />
    </form>
  );
};

export default RegisterForm;
