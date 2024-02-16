import { configureStore } from '@reduxjs/toolkit';
import { apiConnection } from '@/app/api/apiConnection';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiConnection.reducerPath]: apiConnection.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiConnection.middleware),
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
