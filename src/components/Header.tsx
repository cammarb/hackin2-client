import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { Navbar } from './Navbar';
import whiteLogo from '/Hackin2_logo_white.svg';
import blackLogo from '/Hackin2_logo_black.svg';
import { useTheme } from './theme-provider';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';

const links = [
  {
    title: 'Dashboard',
    url: 'company/dashboard'
  },
  {
    title: 'User and Access Management',
    url: 'company/users'
  },
  {
    title: 'Program Management',
    url: 'company/programs'
  },
  {
    title: 'Settings',
    url: 'company/settings'
  }
];

const authLinks = [
  {
    title: 'Login',
    url: 'login'
  },
  {
    title: 'Register',
    url: 'register'
  }
];

export const Header = () => {
  const user = useSelector(selectCurrentUser);
  const { theme } = useTheme();

  const logo = theme === 'light' ? blackLogo : whiteLogo;

  return (
    <header className="sticky top-0 flex h-16 mb-10 items-center border-b bg-background px-4 md:px-6">
      <img src={logo} alt="Logo" className="h-8 w-auto" />

      {user ? (
        <>
          <Navbar links={links} className="justify-center flex-grow" />

          <div className="flex items-center justify-end gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Navbar links={authLinks} className="flex-grow justify-end" />
      )}
    </header>
  );
};
