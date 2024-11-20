import apiClient from 'config/apiConfig';
import { useNavigate } from 'react-router-dom';
export const isTokenExpired = async () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiClient.get('user/auth');
    console.log(response);
    return true;
  } catch (error) {
    console.error('Token is invalid or expired', error);
    if (error.response?.data?.message === 'Token is invalid') {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
    return true;
  }
};