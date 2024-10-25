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
    })
  })
})

export const { useNewPaymentMutation, useGetPaymentByCheckoutSessionIdQuery } =
  paymentsApiSlice
