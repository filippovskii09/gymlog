import { yupResolver } from '@hookform/resolvers/yup';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import useButtonText from '../useButtonText';
import useAuthDispatch from './useAuthDispatch';

type UseAuthFormHandlerProps<TFormData extends Record<string, unknown>, TResponse> = {
  schema: ObjectSchema<TFormData>;
  mutation: () => readonly [
    (data: TFormData) => Promise<TResponse>,
    { isLoading: boolean; isSuccess: boolean; isError: boolean; error: any },
  ];
  defaultButtonText: string;
  onSuccessNavigate?: string | ((data: TResponse) => string);
  isLogin?: boolean;
  isForgotPassword?: boolean;
  isNewPassword?: boolean;
  isVerifyCode?: boolean;
};

export const useAuthFormHandler = <TFormData extends Record<string, unknown>, TResponse>({
  schema,
  mutation,
  defaultButtonText,
  onSuccessNavigate,
  isLogin,
  isForgotPassword,
  isNewPassword,
  isVerifyCode,
}: UseAuthFormHandlerProps<TFormData, TResponse>) => {
  const [mutate, { isLoading, isSuccess, isError, error }] = mutation();
  const [submitError, setSubmitError] = useState<string | null | undefined>(null);
  const router = useRouter();
  const { setLoginUser, setForgotPasswordUserEmail } = useAuthDispatch();

  const buttonText = useButtonText({
    isLoading,
    isSuccess,
    isError,
    defaultText: defaultButtonText,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<TFormData>({
    resolver: yupResolver(schema) as unknown as Resolver<TFormData>,
    mode: 'onBlur',
  });

  const onSubmit = async (formData: TFormData) => {
    try {
      const response = await mutate(formData);

      if (isLogin) {
        setLoginUser({ user: response });
      }

      if (isForgotPassword) {
        setForgotPasswordUserEmail(formData as unknown as { email: string });
      }

      if (isVerifyCode) {
        const resetToken = (response as { resetToken: string })?.resetToken;
        if (!resetToken) {
          throw new Error('Reset token is missing!');
        }
        router.push(`${onSuccessNavigate}?token=${resetToken}`);
      }
    } catch (err) {
      console.log('submit error catiching', err);

      const errorMessage =
        ((err as FetchBaseQueryError)?.data as { message?: string })?.message ||
        (err as SerializedError)?.message ||
        'An unknown error occurred';
      setSubmitError(errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (onSuccessNavigate) {
        if (typeof onSuccessNavigate === 'string' && !isVerifyCode) {
          router.push(onSuccessNavigate);
        }
      }
    }
  }, [isSuccess, onSuccessNavigate, isVerifyCode]);

  let mutationError: string | null = null;

  if (error && 'status' in error) {
    mutationError =
      ((error as FetchBaseQueryError).data as { message?: string })?.message || 'Server error';
  } else if (error instanceof Error) {
    mutationError = error.message;
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    buttonText,
    submitError,
    mutationError,
    setValue,
  };
};
