import { apiConnection } from '@/app/api/apiConnection'

export const bountyApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    newBounty: builder.mutation({
      query: (body) => ({
        url: '/bounties/new',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Bounty']
    }),
    editBounty: builder.mutation({
      query: ({ id, body }) => ({
        url: `/bounties/${id}/edit`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Bounty']
    }),
    getBountyById: builder.query({
      query: (id) => ({
        url: `/bounties/${id}`,
        method: 'GET'
      }),
      providesTags: ['Bounty']
    }),
    getBounties: builder.query({
      query: (paramsArray) => {
        const queryString = paramsArray
          .map(
            ({ key, value }: { key: string; value: string }) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join('&')

        return {
          url: `/bounties?${queryString}`,
          method: 'GET'
        }
      },
      providesTags: ['Bounty']
    }),
    getBountyAssignments: builder.query({
      query: ({ key, value }) => ({
        url: `/bounty-assignments?${key}=${value}`,
        method: 'GET'
      }),
      providesTags: ['Bounty']
    })
  })
})

export const {
  useNewBountyMutation,
  useEditBountyMutation,
  useGetBountyByIdQuery,
  useGetBountiesQuery,
  useGetBountyAssignmentsQuery
} = bountyApiSlice
