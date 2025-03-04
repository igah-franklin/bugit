

import Cookies from 'js-cookie';
import axiosInstance from '@/config/axiosInstance';

// export const getAccessToken = () => Cookies.get('accessToken');
export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return Cookies.get('accessToken');
  }
  return undefined;
};


export const setAccessToken = (token: string) => {
  Cookies.set('accessToken', token, { secure: true });
};

export const getRefreshToken = () => Cookies.get('refreshToken');
export const removeToken = () => Cookies.remove('accessToken');

export const setRefreshToken = (token: string) => {
  Cookies.set('refreshToken', token, { secure: true });
};


export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('Refresh token not available');
    }
  
    // Make the refresh token request
    const response = await axiosInstance.post('/auth/refresh-token', {
      token:refreshToken,
    });
  
    const { accessToken, refreshToken: newRefreshToken } = response.data;
  
    // Update tokens in cookies
    setAccessToken(accessToken);
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken); // Optional, if backend rotates refresh tokens
    }
  
    return accessToken;
  };
