import { apiConnection } from '@/app/api/apiConnection'
import authReducer from '@/features/auth/authSlice'
import sessionReducer from '@/features/auth/sessionApiSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { rtkQueryErrorLogger } from './api/apiMiddleware'

const rootReducer = combineReducers({
  [apiConnection.reducerPath]: apiConnection.reducer,
  auth: authReducer,
  session: sessionReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiConnection.middleware,
      rtkQueryErrorLogger
    ),
  devTools: true,
    preloadedState
  })
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiConnection.middleware,
      rtkQueryErrorLogger
    ),
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
