import { createHTTPClient } from './httpClient';

const statusURL = `${import.meta.env.VITE_SERVER_API}/status`;
const statusClient = createHTTPClient(statusURL);

export const getAllStatuses = async () => {
  return (await statusClient.get('/')).data;
};


