import { apiConnection } from '@/app/api/apiConnection'

export const paymentsApiSlice = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    newPayment: builder.mutation({
      query: (body) => ({
        method: 'POST',
        url: '/payments/new',
        body
      })
    })
  })
})

export const { useNewPaymentMutation } = paymentsApiSlice
