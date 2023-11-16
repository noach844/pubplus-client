import { notifications } from '@mantine/notifications';
import { loginAPI } from '../api/authAPI';

export const useAuth = () => {
  const login = async (username: string, password: string) => {
    await loginAPI({ username: username, password: password });
  };

  return { login };
};
