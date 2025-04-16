import { RESET_PASSWORD_URLS } from '@/enums/resetPassword.enum';
import { GenericMessageResponse } from '@/types/auth.intarface';
import {
  ForgotPasswordDto,
  NewPasswordDto,
  VerifyCodeDto,
  VerifyCodeResponse,
} from '@/types/password-reset.interface';
import { api } from './api';

const resetPasswordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userForgotPassword: builder.mutation<GenericMessageResponse, ForgotPasswordDto>({
      query: (body) => ({
        url: RESET_PASSWORD_URLS.RESET_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    userVerifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeDto>({
      query: (body) => ({
        url: RESET_PASSWORD_URLS.VERIFY_CODE,
        method: 'POST',
        body,
      }),
    }),
    userNewPassword: builder.mutation<GenericMessageResponse, NewPasswordDto>({
      query: (body) => ({
        url: RESET_PASSWORD_URLS.SET_NEW_PASSWORD,
        method: 'PATCH',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserForgotPasswordMutation,
  useUserVerifyCodeMutation,
  useUserNewPasswordMutation,
} = resetPasswordApi;
