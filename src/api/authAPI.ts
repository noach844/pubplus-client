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
  const res = await authClient.post<string>('/login', payload);
  if (!res) {
    throw new Error('User not found!');
  }
};

export const registerAPI = async (payload: RegisterPayload) => {
  const res = await authClient.post<string>('/register', payload);
  if (!res) {
    throw new Error('Error creating user!');
  }
};
