import { store } from '@/app/store'
import { authApiSlice } from './authApiSlice'

export const authLoader = async () => {
  await store.dispatch(authApiSlice.endpoints.session.initiate({}))
  const session = store.getState().session.isLoggedIn

  if (session) {
    await store.dispatch(authApiSlice.endpoints.refresh.initiate({}))
  }
  return null
}
