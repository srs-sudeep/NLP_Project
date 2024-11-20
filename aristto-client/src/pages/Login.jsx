import React, { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from 'config/apiConfig';
import { useAuth } from 'context/authContext';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (
e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/user/login', formData);
      toast.success('Logged in successfully!');
      const { access_token} = response.data;
      localStorage.setItem('accessToken', access_token);
      login(access_token);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to log in';
      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="flex w-full max-w-4xl h-[480px] rounded-lg overflow-hidden shadow-lg">
        {/* Left Panel - Login Form */}
        <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Login to Your Account</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E7DBCD]"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E7DBCD] w-full"
                required
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="bg-[#B39984] text-white p-3 rounded-lg font-medium hover:bg-[#E7DBCD] transition-colors"
            >
              Sign In
            </button>

            {/* Social Login Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                <img src="/google.png" alt="Google" className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel - New User */}
        <div className="w-1/2 bg-[#B39984] p-8 flex flex-col justify-center items-start text-white">
          <img src="/WhiteLogo.png" alt="Aristto" className=" mb-4" /> 
          {/* <h1 className="text-3xl font-semibold mb-4">WELCOME TO ARISTTO</h1> */}
          <h3 className="text-3xl font-semibold mb-4">New Here?</h3>
          <p className="mb-8 text-teal-50">
            Sign up and discover a great amount of new opportunities!
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-[#E7DBCD] transition-colors flex items-center gap-2"
          >
            Sign Up
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
