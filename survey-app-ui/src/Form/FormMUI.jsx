// MyForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const baseURL="http://localhost:5000"
const MyForm = () => {
  const { handleSubmit, control, formState: { errors },reset } = useForm();
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
    axios.post(baseURL+'/api/submit-survey', data).then((response) => {
      showToast(1,response.data)
      // Fetch updated survey data after submission
     
    }).catch(err=>
      {
        showToast(2,err.response.data)
      });
    reset();
  };
  const showToast = (type,message) => {
    if(type===1)
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Auto close the toast after 2000 milliseconds (2 seconds)
    });
    else 
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });

  };
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: 'center' }}>Survey Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{ required: 'Gender is required' }
            }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="nationality"
              control={control}
              defaultValue=""
              rules={{ required: 'Nationality is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nationality"
                  variant="outlined"
                  fullWidth
                  error={!!errors.nationality}
                  helperText={errors.nationality?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required' ,
              pattern: {
             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
             message: 'Invalid email address',
           },}}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{ required: 'Phone Number is required',
          pattern:  {
                     value:/^\d*$/,
                     message: "Invalid Phone Number"
            } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'Address is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  variant="outlined"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: 'Message is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Message"
                  variant="outlined"
                  fullWidth
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default MyForm;
