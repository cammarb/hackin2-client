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
    getCompanyPrograms: builder.query({
      query: () => ({
        url: `/company/programs`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    }),
    getProgram: builder.query({
      query: (id) => ({
        url: `/company/programs/${id}`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    }),
    getCompanyMembers: builder.query({
      query: () => ({
        url: `/company/members`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    })
  })
});

export const {
  useGetCompanyQuery,
  useGetCompanyProgramsQuery,
  useGetProgramQuery,
  useGetCompanyMembersQuery
} = companyApiSlice;
