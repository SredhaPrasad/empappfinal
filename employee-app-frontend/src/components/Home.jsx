import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Home = () => {
    const [cardData, setData] = useState([]);
    const navigate = useNavigate();
    const role = sessionStorage.getItem('role');

    useEffect(() => {
        axiosInstance.get('http://localhost:3000/employees').then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function update_data(val) {
        navigate('/addemployee', { state: { val } });
    }

    const delete_data = (id) => {
        axiosInstance.delete(`http://localhost:3000/employees/deleteemployee/${id}`)
          .then(() => {
            setData(cardData.filter((item) => item._id !== id));
            alert('Employee deleted successfully');
            navigate('/employees');
          })
          .catch((err) => {
            console.log(err);
            alert('Failed to delete employee');
          });
    };

    return (
        <div style={{ margin: '6%' }}>
            <Grid container spacing={4}>
                {cardData.map((row) => (
                    <Grid item xs={12} sm={6} md={4} key={row._id}>
                        <Card
                            sx={{
                                width: '300px', // Set card width for medium size
                                height: 'auto', // Adjust height automatically
                                margin: 'auto',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#333',
                                        textAlign: 'center',
                                    }}
                                >
                                    {row.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#555',
                                        marginBottom: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    Designation: {row.designation}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#555',
                                        marginBottom: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    Salary: {row.salary}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#555',
                                        marginBottom: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    Department: {row.department}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#555',
                                        textAlign: 'center',
                                    }}
                                >
                                    Location: {row.emplocation}
                                </Typography>
                            </CardContent>
                            {role === 'Admin' && (
                                <CardActions
                                    sx={{
                                        justifyContent: 'center',
                                        paddingBottom: 2,
                                    }}
                                >
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        onClick={() => update_data(row)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        onClick={() => delete_data(row._id)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
