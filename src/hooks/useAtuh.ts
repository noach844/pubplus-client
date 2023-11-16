import { loginAPI, registerAPI, RegisterPayload } from '../api/authAPI';

export const useAuth = () => {
  const login = async (username: string, password: string) => {
    await loginAPI({ username: username, password: password });
  };

  const register = async (userDetails: RegisterPayload) => {
    await registerAPI(userDetails);
  };

  return { login, register };
};
