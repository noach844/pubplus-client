import { createHTTPClient } from './httpClient';

const userURL = `${import.meta.env.VITE_SERVER_API}/user`;
const userClient = createHTTPClient(userURL);

export const getUserDetails = async () => {
  return (await userClient.get('/user-details')).data;
};

export const updateUserStatus = async (id: string) => {
  return (await userClient.patch(`status/${id}`)).data;
};

export const getAllUsersStatuses = async () => {
  return (await userClient.get('/all')).data;
};
