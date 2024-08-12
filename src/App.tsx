import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

export const App = () => {
  return (
    <>
      <Header />
      <main className='min-h-dvh w-dvw pt-[7rem]'>
        <Outlet />
      </main>
    </>
  )
}
