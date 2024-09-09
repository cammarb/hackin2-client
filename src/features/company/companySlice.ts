import { apiConnection } from '@/app/api/apiConnection'

export const companyApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'GET'
      })
    }),
    getCompanyMembers: builder.query({
      query: () => ({
        url: '/members',
        method: 'GET'
      }),
      providesTags: ['Members']
    }),
    addCompanyMembers: builder.mutation({
      query: (member) => ({
        url: '/members/new',
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Members']
    })
  })
})

export const {
  useGetCompanyQuery,
  useGetCompanyMembersQuery,
  useAddCompanyMembersMutation
} = companyApiSlice
