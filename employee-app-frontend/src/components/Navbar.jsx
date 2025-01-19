import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInterceptor';

const Navbar = () => {
  
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.removeItem('logintoken');
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar style={{backgroundColor:'blue'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EmployeeApp
          </Typography>
          <Link to={'/employees'}><Button style={{color:'white'}}>Home</Button></Link>
          {role == 'Admin' && (
            <Link to={'/addemployee'}><Button style={{color:'white'}}>Add Employee</Button></Link>
          )}
          <Button style={{color:'white'}} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar