import React, { useState, useEffect } from 'react';
import apiClient from 'config/apiConfig';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    occupation: '',
    companyUniversity: '',
    email: '',
    password: '************',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get('/user/profile');
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      await apiClient.put('/api/profile', formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile data", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-[#5D4037] text-3xl sm:text-5xl font-lato font-bold">Profile</h2>
          <button
            onClick={() => {
              if (isEditing) saveProfile();
              setIsEditing(!isEditing);
            }}
            className="mt-4 sm:mt-0 px-6 py-2 bg-[#D7C9BF] text-[#5D4037] font-bold rounded-full hover:bg-[#B69B85] transition-colors"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div className="lg:col-span-2 space-y-6">
            {['first_name', 'last_name', 'occupation', 'companyUniversity', 'email', 'password'].map((field, index) => (
              <div key={index}>
                <label className="block text-sm text-[#5D4037] uppercase tracking-wide mb-2">
                  {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </label>
                {isEditing ? (
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#FAF6F3] rounded-lg border border-[#5D4037] text-[#5D4037] font-bold"
                  />
                ) : (
                  <div className="w-full p-3 bg-transparent rounded-lg text-[#5D4037] font-bold">
                    {formData[field]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-[#5D4037] text-xl mb-2 font-bold">SUBSCRIPTION</h3>
            <p className="text-[#5D4037] font-semibold mb-4">FREE Subscription</p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-[#5D4037] uppercase tracking-wide ">Start Date</p>
                <p className="text-[#5D4037] font-semibold">5th May 2021</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-[#5D4037] uppercase tracking-wide">End Date</p>
                <p className="text-[#5D4037] font-semibold">5th May 2021</p>
              </div>
              <button className="px-6 py-2 bg-[#D7C9BF] text-[#5D4037] font-bold rounded-full hover:bg-[#B69B85] transition-colors">
                Renew
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;
