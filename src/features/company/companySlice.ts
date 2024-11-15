import { apiConnection } from '@/app/api/apiConnection'

export const companyApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    newCompany: builder.mutation({
      query: (body) => ({
        url: '/companies/new',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Company']
    }),
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
        url: '/members/invite',
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Members']
    })
  })
})

export const {
  useNewCompanyMutation,
  useGetCompanyQuery,
  useGetCompanyMembersQuery,
  useAddCompanyMembersMutation
} = companyApiSlice
