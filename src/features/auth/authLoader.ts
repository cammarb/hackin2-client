import { store } from '@/app/store';
import { authApiSlice } from './authApiSlice';

export const authLoader = async () => {
  const auth = await store.dispatch(
    authApiSlice.endpoints.session.initiate(null)
  );
  return auth;
};
