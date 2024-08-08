import { apiConnection } from '@/app/api/apiConnection';

export const companyApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: '/company',
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    }),
    getCompanyMembers: builder.query({
      query: () => ({
        url: '/members',
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Members']
    }),
    addCompanyMembers: builder.mutation({
      query: (member) => ({
        url: '/members/new',
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Members']
    })
  })
});

export const {
  useGetCompanyQuery,
  useGetCompanyMembersQuery,
  useAddCompanyMembersMutation
} = companyApiSlice;
