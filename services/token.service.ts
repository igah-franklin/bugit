

import Cookies from 'js-cookie';
import axiosInstance from '@/config/axiosInstance';

export const getAccessToken = () => Cookies.get('accessToken');

export const setAccessToken = (token: string) => {
  console.log(token, 'access token ste')
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
    console.log(accessToken, 'returned accessToken')
  
    // Update tokens in cookies
    setAccessToken(accessToken);
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken); // Optional, if backend rotates refresh tokens
    }
  
    return accessToken;
  };
