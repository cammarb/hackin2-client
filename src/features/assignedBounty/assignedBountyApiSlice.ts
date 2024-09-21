import { apiConnection } from '@/app/api/apiConnection'

export const assignedBountyApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getBountyAssignments: builder.query({
      query: ({ key, value }) => ({
        url: `/bounty-assignments?${key}=${value}`,
        method: 'GET'
      }),
      providesTags: ['Bounty']
    }),
    getBountyAssignmentById: builder.query({
      query: ({ bountyId, userId }) => ({
        url: `/bounty-assignments/${bountyId}?userId=${userId}`,
        method: 'GET'
      }),
      providesTags: ['Bounty']
    })
  })
})

export const { useGetBountyAssignmentsQuery, useGetBountyAssignmentByIdQuery } =
  assignedBountyApiSlice
