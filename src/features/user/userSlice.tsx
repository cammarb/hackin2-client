import { apiConnection } from "../../app/api/apiConnection";

export const userApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    newUser: builder.mutation({
      query: (userDetails) => ({
        url: "/register",
        method: "POST",
        body: { ...userDetails },
      }),
    }),
  }),
});

export const { useGetUserQuery, useNewUserMutation } = userApiSlice;
