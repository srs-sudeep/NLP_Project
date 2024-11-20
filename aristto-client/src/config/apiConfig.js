import axios from 'axios';
import { Navigate } from 'react-router-dom';



const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

apiClient.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');

  // If there's no access token, proceed without modifying the config
  if (!accessToken) {
    return config;
  }

  config.headers['AccessToken'] = accessToken;
  return config;
}, (error) => {
  return Promise.reject(error);
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized request');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
