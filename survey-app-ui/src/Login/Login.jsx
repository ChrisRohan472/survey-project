import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, CssBaseline, Typography } from '@mui/material';
import axios from 'axios';


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/surveylist');
    } catch (error) {
      alert('Invalid credentials. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div style={{padding:10,paddingTop:100}} >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
