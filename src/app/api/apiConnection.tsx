import {
  BaseQueryApi,
  FetchArgs,
  createApi,
<<<<<<< HEAD
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {
  setCredentials,
  removeCredentials,
  AuthState,
} from '../../features/auth/authSlice'
import { RootState } from '../store'
=======
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import {
  setCredentials,
  removeCredentials,
  AuthState
} from '@/features/auth/authSlice';
import { RootState } from '@/app/store';
>>>>>>> dev_melvin

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
<<<<<<< HEAD
    const token = (getState() as RootState).auth.token
    if (token) headers.set('Authorization', `Bearer ${token}`)

    return headers
  },
})
=======
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
});
>>>>>>> dev_melvin

const baseQueryRefresh = async (
  args: string | FetchArgs = '',
  api: BaseQueryApi,
  extraOptions: object
) => {
<<<<<<< HEAD
  let result = await baseQuery(args, api, extraOptions)

  if (result?.meta?.response?.status === 403) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      const { user, token } = refreshResult.data as AuthState

      api.dispatch(setCredentials({ user: user, token: token }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(removeCredentials())
    }
  }

  return result
}

export const apiConnection = createApi({
  baseQuery: baseQueryRefresh,
  endpoints: () => ({}),
})
=======
  let result = await baseQuery(args, api, extraOptions);

  if (result?.meta?.response?.status === 403) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const { user, token } = refreshResult.data as AuthState;

      api.dispatch(setCredentials({ user: user, token: token }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeCredentials());
    }
  }

  return result;
};

export const apiConnection = createApi({
  baseQuery: baseQueryRefresh,
  endpoints: () => ({})
});
>>>>>>> dev_melvin
