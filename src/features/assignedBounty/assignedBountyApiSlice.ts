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
      query: (id) => ({
        url: `/bounty-assignments/${id}`,
        method: 'GET'
      }),
      providesTags: ['Bounty']
    })
  })
})

export const { useGetBountyAssignmentsQuery, useGetBountyAssignmentByIdQuery } =
  assignedBountyApiSlice
