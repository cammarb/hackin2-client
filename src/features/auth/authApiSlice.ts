import { apiConnection } from '@/app/api/apiConnection'
import { removeCredentials, setCredentials } from '@/features/auth/authSlice'
import { setSession } from './sessionApiSlice'

export const authApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(removeCredentials())
          setTimeout(() => {
            dispatch(apiConnection.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      }
    }),
    refresh: builder.query({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { user, token, role, company } = data
          dispatch(
            setCredentials({
              user: user,
              token: token,
              role: role,
              company: company
            })
          )
        } catch (err) {
          console.log(err)
        }
      }
    }),
    session: builder.query({
      query: () => ({
        url: '/auth/session',
        method: 'GET'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          if (response.meta?.response?.status === 200)
            dispatch(setSession({ isLoggedIn: true }))
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshQuery,
  useSessionQuery
} = authApiSlice
