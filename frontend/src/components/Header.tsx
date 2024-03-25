import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Box, Typography, useTheme} from "@mui/material"
import FlexBetween from './FlexBetween';

const logo = require('../assets/logo.png')

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in
  const {palette} = useTheme();
  const location = useLocation();

  const [selected, setSelected] = useState(() => {
    const currentPath = location.pathname;
    console.log("current path", currentPath);
    return currentPath.slice(1) || 'Home'; // Initialize selected link based on current location
  });

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedLink = currentPath.slice(1) || 'Home'; // Remove the leading slash and set default to 'Home'
    setSelected(selectedLink);
  }, [location.pathname]);


  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* Left Side */}
        <FlexBetween gap="0.75rem">
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Logo" style={{ marginRight: '0.5rem', height: '125px', width: 'auto' }} />
          </Box>
          <Typography variant='h4' fontSize="28px">
            <p>Lok Avaaj</p>
            <p>Government of GOA</p>
          </Typography>
        </FlexBetween>
      {/* Right Side */}
        <FlexBetween gap="2rem" mr="5rem">
            <Box sx={{"$:hover": {color:palette.primary[800]}}}>
              <Link to="/home" onClick={()=>setSelected("Home")} style={{color:selected ==="Home" ? "inherit" : palette.grey[700], textDecoration: "inherit", }}>
                <Typography variant='h5'  sx={{"$:hover": {color:palette.primary[700]}}}>Home</Typography>
              </Link>
            </Box>
            <Box sx={{"$:hover": {color:palette.primary[100]}}}>
              <Link to="/about" onClick={()=>setSelected("About")} style={{color:selected ==="About" ? "inherit" : palette.grey[700], textDecoration: "inherit",}}>
              <Typography variant='h5' >About</Typography>
              </Link>
            </Box>
            <Box sx={{"$:hover": {color:palette.primary[100]}}}>
              <Link to="/departments" onClick={()=>setSelected("Departments")} style={{color:selected ==="Departments" ? "inherit" : palette.grey[700], textDecoration: "inherit", }}>
              <Typography variant='h5' >Departments</Typography>
              </Link>
            </Box>
            <Box sx={{"$:hover": {color:palette.primary[100]}}}>
              <Link to="/services" onClick={()=>setSelected("Services")} style={{color:selected ==="Services" ? "inherit" : palette.grey[700], textDecoration: "inherit", }}>
              <Typography variant='h5' >Services</Typography>
              </Link>
            </Box>
            <Box sx={{"$:hover": {color:palette.primary[100]}}}>
              <Link to="/contacts" onClick={()=>setSelected("Contacts")} style={{color:selected ==="Contacts" ? "inherit" : palette.grey[700], textDecoration: "inherit", }}>
              <Typography variant='h5' >Contacts</Typography>
              </Link>
            </Box>
            <Box sx={{"$:hover": {color:palette.primary[100]}}}>
              {isLoggedIn ? (
              <Box display="flex" alignItems="center">
                <Link to="/applications" onClick={() => setSelected("FetchApplications")} style={{ color: selected === "FetchApplications" ? "inherit" : palette.grey[700], textDecoration: "inherit", }}>
                <Typography variant='h5' >Applications</Typography>
                </Link>
                <Box ml={3}>
                <Link to="/dashboard" onClick={() => setSelected("Dashboard")} style={{ color: selected === "Dashboard" ? "inherit" : palette.grey[700], textDecoration: "inherit", }}>
                <Typography variant='h5' >Dashboard</Typography>
                </Link>
                </Box>
                {/* Add margin to create space between links */}
                <Box ml={3}>
                  <Link to={'/'} onClick={handleLogout} style={{ color: palette.grey[700], textDecoration: "inherit", }}>
                  <Typography variant='h5' >Logout</Typography>
                  </Link>
                </Box>
              </Box>
              ) : (
                <Link to="/login" onClick={() => setSelected("Login")} style={{ color: selected === "Login" ? "inherit" : palette.grey[700], textDecoration: "inherit" }}>
                  <Typography variant='h5' >Login</Typography>
                </Link>
              )}
            </Box>
        </FlexBetween>
    </FlexBetween>
  );
};

export default Header;

