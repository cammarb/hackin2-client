<<<<<<< HEAD
import { apiConnection } from '../../app/api/apiConnection'
=======
import { apiConnection } from '@/app/api/apiConnection';
>>>>>>> dev_melvin

export const userApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/user/account`,
        method: 'GET',
<<<<<<< HEAD
        refetchOnMountOrArgChange: 30,
      }),
=======
        refetchOnMountOrArgChange: 30
      })
>>>>>>> dev_melvin
    }),
    putUser: builder.query({
      query: (userDetails) => ({
        url: `/user/account/edit`,
        method: 'PUT',
<<<<<<< HEAD
        body: { ...userDetails },
      }),
=======
        body: { ...userDetails }
      })
>>>>>>> dev_melvin
    }),
    newUser: builder.mutation({
      query: (userDetails) => ({
        url: '/user/register',
        method: 'POST',
<<<<<<< HEAD
        body: { ...userDetails },
      }),
    }),
  }),
})

export const { useGetUserQuery, useNewUserMutation, usePutUserQuery } =
  userApiSlice
=======
        body: { ...userDetails }
      })
    })
  })
});

export const { useGetUserQuery, useNewUserMutation, usePutUserQuery } =
  userApiSlice;
>>>>>>> dev_melvin
