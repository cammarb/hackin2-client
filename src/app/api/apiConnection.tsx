import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {
  setCredentials,
  removeCredentials,
  AuthState,
} from '../../features/auth/authSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, api: Pick<BaseQueryApi, 'getState'>) => {
    const token = (api.getState() as RootState).auth.token
    if (token) headers.set('Authorization', `Bearer ${token}`)

    return headers
  },
})

const baseQueryRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions)

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
