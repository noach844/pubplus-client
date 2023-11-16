import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const REFRESH_TOKEN_API =
  process.env.REFRESH_TOKEN_API || 'http://localhost:5000/auth/refresh';

const refreshToken = async () => {
  await axios.get(REFRESH_TOKEN_API, {
    withCredentials: true,
  });
};

export const createHTTPClient = (baseURL: string) => {
  const http = axios.create({ baseURL: baseURL, withCredentials: true });
  http.interceptors.response.use(
    <T = unknown>(response: AxiosResponse<T>) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await refreshToken();
          return http(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
  );
  return http;
};
