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
import whiteLogo from '/Hackin2_logo_white.svg'
import blackLogo from '/Hackin2_logo_black.svg'
import { useTheme } from './theme-provider';

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

export const Header = () => {
  const { theme } = useTheme();

  const logo = theme === 'light' ? blackLogo : whiteLogo;

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <img src={logo} alt="Logo" className="h-8 w-auto" />
      <Navbar links={links} />

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
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
    </header>
  );
};
