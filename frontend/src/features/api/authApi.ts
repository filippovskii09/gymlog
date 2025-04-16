import { AUTH_URLS } from '@/enums/auth.enum';
import {
  GenericMessageResponse,
  LoginDto,
  LoginResponse,
  LogoutDto,
  RefreshTokenResponse,
  RegisterDto,
} from '@/types/auth.intarface';
import { setAccessToken } from '../slices/auth/auth.slice';
import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation<GenericMessageResponse, RegisterDto>({
      query: (body) => ({
        url: AUTH_URLS.REGISTER,
        method: 'POST',
        body,
      }),
    }),
    userLogin: builder.mutation<LoginResponse, LoginDto>({
      query: (body) => ({
        url: AUTH_URLS.LOGIN,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { accessToken } = (await queryFulfilled)?.data as unknown as {
            accessToken: string;
          };
          dispatch(setAccessToken(accessToken));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    userLogout: builder.mutation<GenericMessageResponse, LogoutDto>({
      query: (body) => ({
        url: AUTH_URLS.LOGOUT,
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: AUTH_URLS.REFRESH_TOKEN,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useRefreshTokenQuery,
  useUserLogoutMutation,
} = authApi;
