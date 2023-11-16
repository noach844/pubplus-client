import { loginAPI, registerAPI, RegisterPayload } from '../api/authAPI.ts';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    await loginAPI({ username: username, password: password });
  };

  const register = async (userDetails: RegisterPayload) => {
    await registerAPI(userDetails);
  };

  const logout = () => {
    Cookies.remove('refresh_token_cookie');
    Cookies.remove('access_token_cookie');
    navigate('/login');
  };

  return { login, register, logout };
};
