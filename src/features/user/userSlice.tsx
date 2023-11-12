import { apiConnection } from '../../app/api/apiConnection'

export const userApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => ({
        url: `/user/${username}`,
        method: 'GET',
      }),
    }),
    newUser: builder.mutation({
      query: (userDetails) => ({
        url: '/user/register',
        method: 'POST',
        body: { ...userDetails },
      }),
    }),
  }),
})

export const { useGetUserQuery, useNewUserMutation } = userApiSlice
