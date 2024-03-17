// Dashboard.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import {Box, useMediaQuery, useTheme} from "@mui/material";
import DashboardBox from './DashboardBox';
import DashboardRow1 from './DashboardRow1';
import DashboardRow2 from './DashboardRow2';
import DashboardRow3 from './DashboardRow3';

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h i"
  "g h i"
`

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`

const Dashboard: React.FC = () => {
  // Check if the user is logged in
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
  const isLoggedIn = !!localStorage.getItem('token');
  const palette = useTheme();
  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If logged in, render the Dashboard content
  return (
    <Box 
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens ? {
        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
        gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
        gridTemplateAreas: gridTemplateLargeScreens
      } : {
        gridAutoColumns: "1fr",
        gridAutoRows: "80px",
        gridTemplateAreas: gridTemplateSmallScreens
      }
    }
    >
      <DashboardRow1 />
      <DashboardRow2 />
      <DashboardRow3 />
    </Box>
  );
};

export default Dashboard;
