import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCurrentRole,
  selectCurrentUser
} from '@/features/auth/authSlice';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import Forbidden from '@/pages/Error/403';

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user]);

  let content;
  if (!user || !role) {
    content = null;
  } else if (user && role === 'ENTERPRISE') {
    content = <Outlet />;
  } else {
    content = <Forbidden />;
  }

  return content;
};

export default RequireAuth;
