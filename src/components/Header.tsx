import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useLogoutMutation } from '@/features/auth/authApiSlice'
import { selectCurrentRole, selectCurrentUser } from '@/features/auth/authSlice'
import { CircleUser } from 'lucide-react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Navbar } from './Navbar'
import { useTheme } from './theme-provider'
import blackLogo from '/Hackin2_logo_black.svg'
import whiteLogo from '/Hackin2_logo_white.svg'

type Links = {
  title: string
  url: string
}

const enterpriseLinks: Links[] = [
  {
    title: 'Dashboard',
    url: 'dashboard'
  },
  {
    title: 'User and Access Management',
    url: 'users'
  },
  {
    title: 'Program Management',
    url: 'programs'
  },
  {
    title: 'Settings',
    url: 'settings'
  }
]

const pentesterLinks: Links[] = [
  {
    title: 'Bounty Programs',
    url: 'bounty-programs'
  },
  {
    title: 'Submissions',
    url: 'submissions'
  },
  {
    title: 'Applications',
    url: 'applications'
  }
]

const authLinks: Links[] = [
  {
    title: 'Login',
    url: 'login'
  },
  {
    title: 'Register',
    url: 'register'
  }
]

export const Header = () => {
  const user = useSelector(selectCurrentUser)
  const role = useSelector(selectCurrentRole)
  const [logout, { isSuccess }] = useLogoutMutation()
  const navigate = useNavigate()
  const { theme } = useTheme()

  const logo = theme === 'light' ? blackLogo : whiteLogo

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  let links: Links[]
  if (user && role === 'ENTERPRISE') {
    links = enterpriseLinks
  } else if (user && role === 'PENTESTER') {
    links = pentesterLinks
  } else {
    links = authLinks
  }

  return (
    <header className='fixed top-0 w-dvw flex h-16 items-center border-b bg-background px-4 md:px-6'>
      <img src={logo} alt='Logo' className='h-8 w-auto' />

      {user ? (
        <>
          <Navbar links={links} className='justify-center flex-grow' />
          <div className='flex items-center justify-end gap-4'>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  size='icon'
                  className='rounded-full'
                >
                  <CircleUser className='h-5 w-5' />
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={'settings'}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Navbar links={authLinks} className='flex-grow justify-end' />
      )}
    </header>
  )
}
