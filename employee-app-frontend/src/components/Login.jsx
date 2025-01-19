import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const Login = () => {

    const [form,setForm] = useState({
        email:'',
        password:''
      })

    const navigate = useNavigate();
    function capvalue(){
        axios.post('http://localhost:3000/users/login', form).then((res) =>{
            alert(res.data.message)
            if(res.data.token){
                const token = res.data.token;
                sessionStorage.setItem('logintoken',token);
                const decodedToken = jwtDecode(token);
                sessionStorage.setItem('role', decodedToken.role);
                navigate('/employees');
            }
            else{
                navigate('/');
            }
        }).catch((error) =>{
            alert('Invalid login');
        })
    }

  return (
    <div style={{margin:'10%'}}>
        <Typography variant='h3'style={{color: 'blue'}}>Login</Typography><br></br><br></br>
        <TextField label='Email' variant='outlined' name="email" onChange={(e)=>{
          setForm({...form,email:e.target.value})
        }}></TextField><br></br><br></br>
        <TextField label='Password' variant='outlined'name="password" type="password" onChange={(e)=>{
          setForm({...form,password:e.target.value})
        }}></TextField>
        <br></br><br></br>
        <Button color="primary" variant='contained' onClick={capvalue}>Login</Button>
        <div>
            <Link to={'/signup'} style={{color: 'green'}}>New user? Please Register here</Link>
        </div>
    </div>
  )
}

export default Login