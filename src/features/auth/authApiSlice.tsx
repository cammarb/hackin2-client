<<<<<<< HEAD
import { apiConnection } from '../../app/api/apiConnection'
import { removeCredentials } from './authSlice'
=======
import { apiConnection } from '@/app/api/apiConnection';
import { removeCredentials } from '@/features/auth/authSlice';
>>>>>>> dev_melvin

export const authApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
<<<<<<< HEAD
        body: { ...credentials },
      }),
=======
        body: { ...credentials }
      })
>>>>>>> dev_melvin
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
<<<<<<< HEAD
        method: 'POST',
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
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice
=======
        method: 'POST'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(removeCredentials());
          setTimeout(() => {
            dispatch(apiConnection.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
>>>>>>> dev_melvin
