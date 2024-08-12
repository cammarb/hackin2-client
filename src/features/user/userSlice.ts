import { apiConnection } from '@/app/api/apiConnection'

export const userApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    editUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}/edit`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['User']
    }),
    newUser: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...userDetails }
      })
    })
  })
})

export const { useGetUserQuery, useNewUserMutation, useEditUserMutation } =
  userApiSlice
