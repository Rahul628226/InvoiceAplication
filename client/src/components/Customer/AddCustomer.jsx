import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';

const AddCustomer = () => {
  const [inp, setInp] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    district: '',
    state: '',
    Country: '',
    email: '',
    phone: '',
    pin:'',
    GstinNo: '',
    GstinNo1: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const inpHandler = (e) => {
    const { name, value } = e.target;
    setInp((inp) => ({ ...inp, [name]: value }));
  };

  const clickHandler = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/addcustomer', inp);
      console.log(response.data);

      setSuccessMessage('Customer added successfully!');

      setInp({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        district: '',
        state: '',
        Country: '',
        email: '',
        phone: '',
        pin:'',
        GstinNo: '',
        GstinNo1: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ paddingTop: '0px' }}>
      <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Customer Details
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                onChange={inpHandler}
                name="firstName"
                value={inp.firstName}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                onChange={inpHandler}
                name="lastName"
                value={inp.lastName}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address 1"
                onChange={inpHandler}
                name="address1"
                value={inp.address1}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address 2"
                onChange={inpHandler}
                name="address2"
                value={inp.address2}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="District"
                onChange={inpHandler}
                name="district"
                value={inp.district}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                onChange={inpHandler}
                name="state"
                value={inp.state}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country"
                onChange={inpHandler}
                name="Country"
                value={inp.Country}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Pin No"
                onChange={inpHandler}
                name="pin"
                value={inp.pin}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                onChange={inpHandler}
                name="email"
                value={inp.email}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                label="Phone"
                onChange={inpHandler}
                name="phone"
                value={inp.phone}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                onChange={inpHandler}
                name="GstinNo"
                label="Gstin No"
                value={inp.GstinNo}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                onChange={inpHandler}
                name="GstinNo1"
                value={inp.GstinNo1}
                style={{ display: inp.GstinNo1 ? 'block' : 'none' }}
              />
            </Grid>

            {successMessage && (
              <Typography variant="body1" align="center" color="success" gutterBottom>
                {successMessage}
              </Typography>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" onClick={clickHandler}>
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddCustomer;
