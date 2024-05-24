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
      providesTags: ['Program']
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
    updateProgram: builder.mutation({
      query: ({ id, program }) => ({
        url: `/company/programs/${id}/edit`,
        method: 'PUT',
        body: program
      }),
      invalidatesTags: ['Program']
    }),
    getCompanyMembers: builder.query({
      query: () => ({
        url: `/company/members`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Member']
    }),
    addCompanyMembers: builder.mutation({
      query: (member) => ({
        url: `/company/members/invite`,
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Member']
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
      providesTags: ['Reward']
    }),

    addRewards: builder.mutation({
      query: ({ id, reward }) => ({
        url: `/company/programs/${id}/severityReward/new`,
        method: 'POST',
        body: reward
      }),
      invalidatesTags: ['Reward']
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
  useAddRewardsMutation,
  useGetProgramRewardsQuery
} = companyApiSlice;
