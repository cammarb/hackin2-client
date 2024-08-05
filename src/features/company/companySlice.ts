import { apiConnection } from '@/app/api/apiConnection';

export const companyApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: `/company`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    }),
    getCompanyMembers: builder.query({
      query: () => ({
        url: `/company/members`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Members']
    }),
    addCompanyMembers: builder.mutation({
      query: (member) => ({
        url: `/company/members/invite`,
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Members']
    }),
  })
});

export const {
  useGetCompanyQuery,
  useGetCompanyMembersQuery,
  useAddCompanyMembersMutation,
} = companyApiSlice;
