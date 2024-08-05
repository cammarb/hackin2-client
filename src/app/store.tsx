import { apiConnection } from '@/app/api/apiConnection';
import authReducer from '@/features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from './api/apiMiddleware';

export const store = configureStore({
  reducer: {
    [apiConnection.reducerPath]: apiConnection.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiConnection.middleware, rtkQueryErrorLogger),
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
