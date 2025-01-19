import React, { useState } from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axiosInstance.post('http://localhost:3000/users/adduser', form);
      alert(response.data);
      setForm({ email: '', password: '', confirmPassword: '' }); // Reset form
      navigate('/'); // Navigate to login page
    } catch (error) {
      alert('Failed to Signup. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '5%' }}>
      <Card sx={{ boxShadow: 3, padding: 3, maxWidth: 500, margin: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Create an Account
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  width: '100%',
                  padding: '12px 0',
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
              <Link to={'/'} style={{ color: 'blue', textDecoration: 'none' }}>
                Already Registered? Login here
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
