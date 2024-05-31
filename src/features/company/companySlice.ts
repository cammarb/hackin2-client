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
      }),
      providesTags: ['Programs']
    }),
    getProgram: builder.query({
      query: (id) => ({
        url: `/company/programs/${id}`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Program']
    }),
    addProgram: builder.mutation({
      query: (program) => ({
        url: `/company/programs/new`,
        method: 'POST',
        body: program
      }),
      invalidatesTags: ['Programs']
    }),
    updateProgram: builder.mutation({
      query: ({ id, program }) => ({
        url: `/company/programs/${id}/edit`,
        method: 'PUT',
        body: program
      }),
      invalidatesTags: ['Program', 'Programs']
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
    getProgramBounties: builder.query({
      query: (id) => ({
        url: `/company/programs/${id}/bounties`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      })
    }),
    getProgramRewards: builder.query({
      query: (id) => ({
        url: `/company/programs/${id}/severityReward`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Rewards']
    }),
    updateReward: builder.mutation({
      query: ({ id, body }) => ({
        url: `/company/severityReward/${id}/edit`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Rewards']
    })
  })
});

export const {
  useGetCompanyQuery,
  useGetCompanyProgramsQuery,
  useGetProgramQuery,
  useGetProgramBountiesQuery,
  useAddProgramMutation,
  useGetCompanyMembersQuery,
  useAddCompanyMembersMutation,
  useUpdateProgramMutation,
  useUpdateRewardMutation,
  useGetProgramRewardsQuery
} = companyApiSlice;
