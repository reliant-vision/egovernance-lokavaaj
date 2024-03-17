import React, { useState } from 'react';
import { TextField, Button, Typography, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

interface LoginProps {
  onLogin: () => void; // Define a prop for handling successful login
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        onLogin(); // Call the onLogin function to handle successful login
        navigate('/dashboard'); // Navigate to the dashboard page
      } else {
        setError(data.message); // Set error message if authentication fails
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const {palette} = useTheme();

  return (
    <Box>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
    <div>
      <Typography variant="h2">Login</Typography>
      <div>
        <TextField 
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: palette.grey[300]} }}
          InputProps={{ style: { color: palette.grey[300] } }}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: palette.grey[300] } }}
          InputProps={{ style: { color: palette.grey[300] } }}

        />
      </div>
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      {error && <Typography variant="body1">{error}</Typography>}
    </div>
    </FlexBetween>
        </div>
    </Box>
    
  );
};

export default Login;
