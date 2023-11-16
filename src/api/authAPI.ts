import { createHTTPClient } from './httpClient';

type LoginPayload = {
  username: string;
  password: string;
};

const authURL = `${import.meta.env.VITE_SERVER_API}/auth`;
const authClient = createHTTPClient(authURL);

export const loginAPI = async (payload: LoginPayload) => {
  await authClient.post<string>('/', payload);
};
