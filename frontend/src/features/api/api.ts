import { AUTH_URLS } from '@/enums/auth.enum';
import { RootState } from '@/store/store';
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearAccessToken, setAccessToken } from '../slices/auth/auth.slice';
import { BASE_URL, TAG_TYPES } from './../../constants/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    console.log('🔑 Access token:', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  argApi: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, argApi, extraOptions);

  if (result.error && result.error.status === 403) {
    console.log('Forbidden access, redirecting to login...');
    argApi.dispatch(clearAccessToken());
    return result;
  }

  if (result.error && result.error.status === 401) {
    console.log('Access token expired, refreshing...');

    const refreshResult = await baseQuery(
      {
        url: AUTH_URLS.REFRESH_TOKEN,
        method: 'POST',
        credentials: 'include',
      },
      argApi,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      argApi.dispatch(setAccessToken(accessToken));

      result = await baseQuery(args, argApi, extraOptions);
    } else {
      argApi.dispatch(clearAccessToken());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: TAG_TYPES,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
