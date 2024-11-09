import axios, {Method} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getToken, removeToken, saveToken} from '../store/storage';

axios.interceptors.request.use(async config => {
  const token = await getToken('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await getToken('refresh_token');
      if (refreshToken) {
        try {
          const newAccessToken = await getValidIdToken(refreshToken);
          await saveToken('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError);
          await removeToken('access_token');
          await removeToken('refresh_token');
          // 로그아웃 처리 또는 사용자에게 재로그인 요청
        }
      }
    }
    return Promise.reject(error);
  },
);

// TODO: 환경변수로 변경
const baseUrl = 'http://localhost:3000/api';

const camelToSnake = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => camelToSnake(item));
  }

  return Object.keys(obj).reduce((acc: any, key: string) => {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    acc[snakeKey] = camelToSnake(obj[key]);
    return acc;
  }, {});
};

const snakeToCamel = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => snakeToCamel(item));
  }

  return Object.keys(obj).reduce((acc: any, key: string) => {
    const camelKey = key.replace(/_([a-z])/g, match => match[1].toUpperCase());
    acc[camelKey] = snakeToCamel(obj[key]);
    return acc;
  }, {});
};

export const request = async (
  endpoint: string,
  method: Method = 'POST',
  payload?: object,
) => {
  try {
    const convertedPayload = payload ? camelToSnake(payload) : undefined;
    console.log(`${baseUrl}/${endpoint}`);
    const response = await axios({
      url: `${baseUrl}/${endpoint}`,
      method: method,
      data: convertedPayload,
    });

    const convertedResponse = snakeToCamel(response.data);
    return convertedResponse;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response?.data?.detail || 'Request failed');
  }
};

export const getValidIdToken = async (refreshToken: string) => {
  try {
    const data = await request(`${baseUrl}/users/refresh`, 'POST', {
      refresh_token: refreshToken,
    });
    return data.access_token;
  } catch (err) {
    throw new Error('Failed to get a valid ID token');
  }
};
