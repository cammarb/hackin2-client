<<<<<<< HEAD
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './authSlice'
import { useGetUserQuery } from '../user/userSlice'

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser)
  const location = useLocation()
=======
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetUserQuery } from '@/features/user/userSlice';

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
>>>>>>> dev_melvin

  const {
    data: userResponse,
    isLoading,
    isSuccess,
    isError,
<<<<<<< HEAD
    error,
  } = useGetUserQuery(user)

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError || !user || userResponse?.data === null) {
    console.log(error)
=======
    error
  } = useGetUserQuery(user);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError || !user || userResponse?.data === null) {
    console.log(error);
>>>>>>> dev_melvin
    content = (
      <div>
        <p>Error loading user data.</p>
        <Navigate to="/login" state={{ from: location }} replace />
      </div>
<<<<<<< HEAD
    )
  } else if (isSuccess && userResponse?.data !== null) {
    content = <Outlet />
  } else {
    content = <p>User not authenticated.</p>
  }

  return content
}

export default RequireAuth
=======
    );
  } else if (isSuccess && userResponse?.data !== null) {
    content = <Outlet />;
  } else {
    content = <p>User not authenticated.</p>;
  }

  return content;
};

export default RequireAuth;
>>>>>>> dev_melvin
