// App.tsx
import React, { useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { createTheme } from '@mui/material/styles';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import "../src/styles/footer.css";
import FetchApplications from './components/FetchApplications';
import ApplicationsDetails from './components/ApplicationDetails';
import CreateApplication from './components/CreateApplication';
import ApplicationStatus from './components/ApplicationStatus';
import Departments from './components/Departments';
import Portfolios from './components/Portfolios';

const App: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/dashboard');
  };



  const theme = useMemo(()=> createTheme(themeSettings), []);

  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem"> */}
        <Box minHeight="100vh" display="flex" flexDirection="column" padding="1rem 1rem 1rem 2rem">
            <Header/>
            <Box flexGrow={1}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/applications" element={<FetchApplications/>} />
                <Route path="/applications/:application_number" element={<ApplicationsDetails/>} />
                <Route path="/NewApplication" element={<CreateApplication/>} />
                <Route path= "/KnowYourApplicationStatus" element={<ApplicationStatus/>} />
                <Route path="/departments/*" element={<Departments/>} />
            </Routes>
            </Box>
            <Footer/>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
