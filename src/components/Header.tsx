import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/authApiSlice";

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
      await logout("");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Hackin2</a>
        </div>

        <div className="navbar-end gap-4">
          <a className="">Log In</a>
          <a className="btn btn-primary">Register</a>
        </div>
      </div>
    </>
  );
}
