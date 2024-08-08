import { apiConnection } from '@/app/api/apiConnection'

export const submissionSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissionsByProgram: builder.query({
      query: (program) => ({
        url: `/submissions?program=${program}`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Submissions']
    }),
    getSubmissionsByUser: builder.query({
      query: (user) => ({
        url: `/submissions?user=${user}`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Submissions']
    }),
    getSubmissionsById: builder.query({
      query: (id) => ({
        url: `/submissions/${id}`,
        method: 'GET',
        refetchOnMountOrArgChange: 30
      }),
      providesTags: ['Submissions']
    }),
    updateSubmission: builder.mutation({
      query: ({ id, body }) => ({
        url: `/submissions/${id}/edit`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Submissions']
    }),
    addSubmission: builder.mutation({
      query: ({ body }) => ({
        url: '/submissions/new',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Submissions']
    })
  })
})

export const {
  useGetSubmissionsByProgramQuery,
  useGetSubmissionsByUserQuery,
  useGetSubmissionsByIdQuery,
  useAddSubmissionMutation,
  useUpdateSubmissionMutation
} = submissionSlice
