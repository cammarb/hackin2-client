import { apiConnection } from '@/app/api/apiConnection';
import { removeCredentials, setCredentials } from '@/features/auth/authSlice';

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
    }),
    refresh: builder.query({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, token, role } = data;
          dispatch(setCredentials({ user: user, token: token, role: role }));
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useRefreshQuery } =
  authApiSlice;
