import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import {
  setCredentials,
  removeCredentials,
  AuthState
} from '@/features/auth/authSlice';
import { RootState } from '@/app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
});

const baseQueryRefresh = async (
  args: string | FetchArgs = '',
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.meta?.response?.status === 403 && result?.error?.data?.message == 'Token expired') {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
    console.log('Refresh result', refreshResult);
    if (!refreshResult.data) api.dispatch(removeCredentials());
    try {
      const { user, token, role } = refreshResult.data as AuthState;
      api.dispatch(setCredentials({ user: user, token: token, role: role }));
      result = await baseQuery(args, api, extraOptions);
    } catch (error) {
      console.error('Error refreshing token', error);
    }

  }
  return result;
};

export const apiConnection = createApi({
  baseQuery: baseQueryRefresh,
  tagTypes: ['Company', 'Programs', 'Program', 'Members', 'Bounty', 'Scope', 'Rewards'],
  endpoints: () => ({})
});
