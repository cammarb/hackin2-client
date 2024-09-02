import { apiConnection } from '@/app/api/apiConnection'

export const programSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getActivePrograms: builder.query({
      query: () => ({
        url: '/programs?status=active',
        method: 'GET'
      })
    }),
    getCompanyPrograms: builder.query({
      query: (id) => ({
        url: `/programs?company=${id}`,
        method: 'GET'
      }),
      providesTags: ['Programs']
    }),
    getProgramById: builder.query({
      query: (id) => ({
        url: `/programs/${id}`,
        method: 'GET'
      }),
      providesTags: ['Programs']
    }),
    addProgram: builder.mutation({
      query: ({ id, body }) => ({
        url: `/programs/new?company=${id}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Programs']
    }),
    updateProgram: builder.mutation({
      query: ({ id, program }) => ({
        url: `/programs/${id}/edit`,
        method: 'PUT',
        body: program
      }),
      invalidatesTags: ['Programs']
    })
  })
})

export const {
  useGetActiveProgramsQuery,
  useGetCompanyProgramsQuery,
  useGetProgramByIdQuery,
  useUpdateProgramMutation,
  useAddProgramMutation
} = programSlice
