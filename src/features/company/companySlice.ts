import { apiConnection } from '@/app/api/apiConnection';
import { Program } from '@/interface/Program';

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
      }),
      providesTags: ['Program'],
    }),
    getProgram: builder.query({
      query: (id) => ({
        url: `/company/programs/${id}`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    }),
    addProgram: builder.mutation({
      query: (program) => ({
        url: `/company/programs/new`,
        method: 'POST',
        body: program
      }),
      invalidatesTags: ['Program']
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
  useAddProgramMutation,
  useGetCompanyMembersQuery
} = companyApiSlice;
