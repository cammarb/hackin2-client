import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectCurrentUser } from '../auth/authSlice'
import { useGetUserQuery } from './userSlice'
import { NavLink } from 'react-router-dom'

export const UserSettings = () => {
  const user = useSelector(selectCurrentUser)

  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetUserQuery(user)

  const settingsLinks = [
    { url: '', title: 'General' },
    { url: 'change-password', title: 'Change Password' }
  ]

  return (
    <>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Settings</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <nav className='grid gap-4 text-sm text-muted-foreground'>
            {settingsLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.url}
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending'
                    : isActive
                      ? 'font-semibold text-primary'
                      : ''
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
          <div className='grid gap-6'>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {isSuccess && <Outlet context={response.user} />}
          </div>
        </div>
      </div>
    </>
  )
}
