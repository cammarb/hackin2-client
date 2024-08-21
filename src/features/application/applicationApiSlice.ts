import { apiConnection } from '@/app/api/apiConnection'

export const applicationApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.mutation({
      query: (body) => ({
        url: '/applications/new',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Applications']
    }),
    editApplication: builder.mutation({
      query: ({ id, body }) => ({
        url: `/applications/${id}/edit`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Applications']
    }),
    getApplicationById: builder.query({
      query: (id) => ({
        url: `/applications/${id}`,
        method: 'GET'
      }),
      providesTags: ['Applications']
    }),
    getApplications: builder.query({
      query: ({ key, value }) => ({
        url: `/applications?${key}=${value}`,
        method: 'GET'
      }),
      providesTags: ['Applications']
    })
  })
})

export const {
  useNewApplicationMutation,
  useEditApplicationMutation,
  useGetApplicationByIdQuery,
  useGetApplicationsQuery
} = applicationApiSlice
