import { toast } from '@/components/ui/use-toast'
import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(action)
    toast({
      title: 'Uh oh! Something went wrong.',
      description:
        'data' in action.payload
          ? (action.payload.data as { message: string }).message
          : action.payload.message
    })
  }
  return next(action)
}
