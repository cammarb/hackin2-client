import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetUserQuery } from '@/features/user/userSlice';

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  const {
    data: userResponse,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery(user);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError || !user || userResponse?.data === null) {
    console.log(error);
    content = (
      <div>
        <p>Error loading user data.</p>
        <Navigate to="/login" state={{ from: location }} replace />
      </div>
    );
  } else if (isSuccess && userResponse?.data !== null) {
    content = <Outlet />;
  } else {
    content = <p>User not authenticated.</p>;
  }

  return content;
};

export default RequireAuth;
