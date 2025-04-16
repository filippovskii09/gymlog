'use client';

import { BUTTON_TEXTS, ROUTES } from '@/constants/constants';
import { useUserLoginMutation } from '@/features/api/authApi';
import { useAuthFormHandler } from '@/hooks/auth/useAuthFormHandler';
import { LoginDto, LoginResponse } from '@/types/auth.intarface';
import Link from 'next/link';
import { FC, FormEvent } from 'react';
import { loginSchema } from '../../schemas/registerSchema';
import BasicButton from '../ui/BasicButton';
import BasicInput from '../ui/BasicInput';

const LoginForm: FC = () => {
  const [trigger, { isLoading, isSuccess, isError, error }] = useUserLoginMutation();

  const { register, handleSubmit, errors, isSubmitting, buttonText, mutationError } =
    useAuthFormHandler<LoginDto, LoginResponse>({
      schema: loginSchema,
      mutation: () => {
        return [
          async (data: LoginDto) => {
            const result = await trigger(data).unwrap();
            return result;
          },
          { isLoading, isSuccess, isError, error: error as { data: { message: string } } },
        ] as const;
      },
      defaultButtonText: BUTTON_TEXTS.AUTH.LOG_IN,
      onSuccessNavigate: ROUTES.USER_SETUP.INDEX,
      isLogin: true,
    });

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className="w-full">
      <div className={'mb-10 flex flex-col gap-5 bg-[#B3A0FF] px-10 py-8'}>
        <BasicInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
        />
        <BasicInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
        />
        {mutationError && (
          <div className="text-sm text-red-600 text-center font-semibold flex items-center justify-center mx-auto">
            <span className="bg-red-200 py-2 px-8 my-4 rounded-xl">{mutationError}</span>
          </div>
        )}
        <Link className={'w-fit ml-auto hover:scale-105'} href={ROUTES.AUTH.FORGOT_PASSWORD}>
          Forgot Password?
        </Link>
      </div>

      <BasicButton
        buttonText={buttonText}
        type="submit"
        disabled={isSubmitting}
        className={mutationError ? 'border-red-500 text-red-500' : ''}
      />
    </form>
  );
};

export default LoginForm;
