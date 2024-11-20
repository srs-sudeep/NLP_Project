import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();


  // Handle navigation
  const handleHome= () => navigate('/');
  

  return (
    <div className="bg-[#B39984] shadow-none rounded-full w-[90vw] h-16 flex justify-between items-center p-4 mx-auto my-4">
      <img onClick={handleHome} src="/WhiteLogo.png" alt="Logo" className="h-8 md:h-12 cursor-pointer" />
    </div>
  );
};

export default Navbar;
