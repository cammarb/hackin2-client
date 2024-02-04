import { apiConnection } from "@/app/api/apiConnection";

export const userApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/user/account`,
        method: "GET",
        refetchOnMountOrArgChange: 30,
      }),
    }),
    putUser: builder.query({
      query: (userDetails) => ({
        url: `/user/account/edit`,
        method: "PUT",
        body: { ...userDetails },
      }),
    }),
    newUser: builder.mutation({
      query: (userDetails) => ({
        url: "/user/register",
        method: "POST",
        body: { ...userDetails },
      }),
    }),
  }),
});

export const { useGetUserQuery, useNewUserMutation, usePutUserQuery } =
  userApiSlice;
