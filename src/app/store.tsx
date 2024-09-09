import { apiConnection } from '@/app/api/apiConnection'
import authReducer from '@/features/auth/authSlice'
import sessionReducer from '@/features/auth/sessionApiSlice'
import { configureStore } from '@reduxjs/toolkit'
import { rtkQueryErrorLogger } from './api/apiMiddleware'

export const store = configureStore({
  reducer: {
    [apiConnection.reducerPath]: apiConnection.reducer,
    auth: authReducer,
    session: sessionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiConnection.middleware,
      rtkQueryErrorLogger
    ),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
