import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { useEffect } from 'react'
import { store } from '@/app/store'
import { authApiSlice } from './features/auth/authApiSlice'

export const App = () => {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     await store.dispatch(authApiSlice.endpoints.session.initiate({}))
  //     const session = store.getState().session.isLoggedIn

  //     if (session) {
  //       await store.dispatch(authApiSlice.endpoints.refresh.initiate({}))
  //     }
  //   }

  //   checkAuth()
  // }, [])
  return (
    <>
      <Header />
      <main className='min-h-dvh w-dvw pt-[7rem]'>
        <Outlet />
      </main>
    </>
  )
}
