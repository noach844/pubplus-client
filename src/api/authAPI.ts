import { createHTTPClient } from './httpClient';

type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  fullname: string;
  password: string;
};

const authURL = `${import.meta.env.VITE_SERVER_API}/auth`;
const authClient = createHTTPClient(authURL);

export const loginAPI = async (payload: LoginPayload) => {
  await authClient.post<string>('/login', payload);
};

export const registerAPI = async (payload: RegisterPayload) => {
  await authClient.post<string>('/register', payload);
};
