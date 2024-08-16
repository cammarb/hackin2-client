import type { RootState } from '@/app/store'
import {
  type AuthState,
  removeCredentials,
  setCredentials
} from '@/features/auth/authSlice'
import {
  type BaseQueryApi,
  type FetchArgs,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) headers.set('Authorization', `Bearer ${token}`)

    return headers
  }
})

const baseQueryRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions)
  const errorResult = result.error as {
    status: number
    data: { message: string }
  }
  if (
    errorResult?.status === 403 &&
    errorResult?.data.message === 'jwt expired'
  ) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
    if (!refreshResult.data) api.dispatch(removeCredentials())
    try {
      const { user, token, role, company } = refreshResult.data as AuthState
      api.dispatch(
        setCredentials({
          user: user,
          token: token,
          role: role,
          company: company
        })
      )
      result = await baseQuery(args, api, extraOptions)
    } catch (error) {
      console.error('Error refreshing token', error)
    }
  }
  return result
}

export const apiConnection = createApi({
  baseQuery: baseQueryRefresh,
  tagTypes: [
    'Company',
    'Programs',
    'Program',
    'Members',
    'Bounty',
    'Scope',
    'Rewards',
    'Submissions',
    'User',
    'Applications'
  ],
  endpoints: () => ({})
})
