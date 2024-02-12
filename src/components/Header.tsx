import * as React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/features/auth/authSlice';
import { useLogoutMutation } from '@/features/auth/authApiSlice';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Log In",
    href: "login",
    description:
      "Link that takes you to the Log In page.",
  },
  {
    title: "Log Out",
    href: "logout",
    description:
    "Button that logs the user out.",

  }, {
    title: "Sign Up",
    href: "signup",
    description:
    "Link that takes you to the Sign Up page.",

  },]


export default function Header() {
  const token = useSelector(selectCurrentToken);
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout('');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {components.map((item)=>{
            return (
              <NavigationMenuItem>
                <NavLink to={item.href} aria-description={item.description}>{item.title}</NavLink>
              </NavigationMenuItem>
            )
          })}

        </NavigationMenuList>
      </NavigationMenu>

    </>
  );
}
