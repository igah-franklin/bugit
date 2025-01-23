'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { getAccessToken, refreshAccessToken, setAccessToken } from '@/services/token.service';
import { baseURL } from './baseUrl';


console.log(baseURL, 'baseU')
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  //withCredentials: true, // Include cookies in requests
});

// Flag to avoid multiple refresh requests
let isRefreshing = false;
let failedRequestsQueue: any[] = [];

const queueFailedRequest = (callback: any) => {
  failedRequestsQueue.push(callback);
};

const retryFailedRequests = (newToken: string) => {
  failedRequestsQueue.forEach((callback) => callback(newToken));
  failedRequestsQueue = [];
};

// Add request interceptor
axiosInstance.interceptors.request.use(
  async(config) => {
    // const token = getAccessToken(); // Get access token
    // console.log('axios instance token', token);
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value; // Get the token from cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();
          console.log(newToken, 'newToken newToken*****')
          isRefreshing = false;

          retryFailedRequests(newToken); // Retry queued requests
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest); // Retry original request
        } catch (refreshError) {
          isRefreshing = false;
          failedRequestsQueue = [];
          return Promise.reject(refreshError);
        }
      }

      // Queue requests while the token is being refreshed
      return new Promise((resolve, reject) => {
        queueFailedRequest((newToken: any) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          axiosInstance(originalRequest).then(resolve).catch(reject);
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
