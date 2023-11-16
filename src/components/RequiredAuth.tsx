import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('refresh_token_cookie');
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
