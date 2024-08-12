import { apiConnection } from '@/app/api/apiConnection'

export const severityRewardSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getSeverityRewards: builder.query({
      query: ({ key, value }) => ({
        url: `/severity-rewards?${key}=${value}`,
        method: 'GET'
      }),
      providesTags: ['Rewards']
    }),
    getSeverityRewardById: builder.query({
      query: (id) => ({
        url: `/severity-rewards/${id}`,
        method: 'GET'
      }),
      providesTags: ['Rewards']
    }),
    updateSeverityReward: builder.mutation({
      query: ({ id, body }) => ({
        url: `/severity-rewards/${id}/edit`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Rewards']
    })
  })
})

export const {
  useGetSeverityRewardByIdQuery,
  useGetSeverityRewardsQuery,
  useUpdateSeverityRewardMutation
} = severityRewardSlice
