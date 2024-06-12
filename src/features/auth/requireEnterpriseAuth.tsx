import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCurrentRole,
  selectCurrentUser
} from '@/features/auth/authSlice';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import Forbidden from '@/pages/Error/403';

const RequireEnterpriseAuth = () => {
  let user = useSelector(selectCurrentUser);
  let role = useSelector(selectCurrentRole);
  const navigate = useNavigate();
  const location = useLocation();

  const { toast } = useToast();

  useEffect(() => {
    if (!user || !role) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);

  if (user && role === 'ENTERPRISE') {
    return <Outlet />;
  } else if ((user && role != 'ENTERPRISE') || !user || !role) {
    return <Forbidden />;
  } else {
    return <></>;
  }
};

export default RequireEnterpriseAuth;
