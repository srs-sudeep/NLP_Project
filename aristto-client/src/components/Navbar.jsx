import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken'); // Check login status

  const [anchorEl, setAnchorEl] = useState(null);

  // Handle opening and closing of the dropdown menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Handle navigation
  const handleLogin = () => navigate('/login');
  const handleHome= () => navigate('/');
  const goToSavedPage = () => navigate('/savedpaper');
  const goToProfilePage = () => navigate('/profile');
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="bg-[#B39984] shadow-none rounded-full w-[90vw] h-16 flex justify-between items-center p-4 mx-auto my-4">
      <img onClick={handleHome} src="/WhiteLogo.png" alt="Logo" className="h-8 md:h-12 cursor-pointer" />

      <div className="flex space-x-4 px-8">
        {isLoggedIn ? (
          <>
            {/* Saved Page Button */}
            <IconButton className="text-white hover:text-blue-300" onClick={goToSavedPage}>
              <BookmarkBorderIcon fontSize="medium" className="text-white md:scale-125" />
            </IconButton>

            {/* Profile Page Button */}
            <IconButton className="text-white hover:text-blue-300" onClick={goToProfilePage}>
              <PersonOutlineIcon fontSize="medium" className="text-white md:scale-125" />
            </IconButton>

            {/* Dropdown Menu Button */}
            <IconButton className="text-white hover:text-blue-300" onClick={handleMenuOpen}>
              <MenuIcon fontSize="medium" className="text-white md:scale-125" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ backgroundColor:  '#EFE9E4' , color: '#836F60' }}
            className="text-[#836F60] font-bold rounded-full px-4 py-1 hover:bg-white mx-2"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
