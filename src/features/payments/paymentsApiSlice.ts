import { apiConnection } from '@/app/api/apiConnection'

export const paymentsApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    newPayment: builder.mutation({
      query: (body) => ({
        method: 'POST',
        url: '/payments/new',
        body
      })
    }),
    getPaymentByCheckoutSessionId: builder.query({
      query: (id) => ({
        method: 'GET',
        url: `/payments/checkoutSession/${id}`
      })
    }),
    getPayments: builder.query({
      query: ({ key, value }) => ({
        method: 'GET',
        url: `/payments?${key}=${value}`
      })
    })
  })
})

export const {
  useNewPaymentMutation,
  useGetPaymentByCheckoutSessionIdQuery,
  useGetPaymentsQuery
} = paymentsApiSlice
