import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, MenuItem } from '@mui/material';
import axios from 'axios';
import Main from '../Main';

const units = ['Piece', 'Kilogram', 'Gram', 'Liter', 'Milliliter', 'Meter', 'Centimeter']; // Array of unit options

const AddProduct = () => {
  const [inp, setInp] = useState({
    HSN: '',
    PName: '',
    price: '',
    unit: '',
    quantity:'',
    unit1: '',
    cgst:'',
    sgst:''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const inpHandler = (e) => {
    const { name, value } = e.target;
    setInp((inp) => ({ ...inp, [name]: value }));
  };

  const clickHandler = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/addProduct', inp);
      console.log(response.data);

      setSuccessMessage('Product added successfully!');

      setInp({
        HSN: '',
        PName: '',
        price: '',
        unit: '',
        quantity: '',
        unit1: '',
        sgst:'',
        cgst:'',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><div>
      <Main />
    </div><div style={{ paddingTop: '0px' }}>
        <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Product Details
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="HSN/SAC"
                  onChange={inpHandler}
                  name="HSN"
                  value={inp.HSN}
                  fullWidth
                  required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  onChange={inpHandler}
                  name="PName"
                  value={inp.PName}
                  fullWidth
                  required />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  onChange={inpHandler}
                  name="price"
                  value={inp.price}
                  fullWidth
                  required />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Quantity"
                  onChange={inpHandler}
                  name="quantity"
                  value={inp.quantity}
                  fullWidth
                  required />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Unit"
                  onChange={inpHandler}
                  name="unit"
                  value={inp.unit}
                  fullWidth
                  required
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  onChange={inpHandler}
                  name="unit1"
                  value={inp.unit1}
                  style={{ display: inp.unit1 ? 'block' : 'none' }} />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="SGST %"
                  onChange={inpHandler}
                  name="SGST"
                  value={inp.sgst}
                  fullWidth
                  required />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="CGST %"
                  onChange={inpHandler}
                  name="CGST"
                  value={inp.cgst}
                  fullWidth
                  required />
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
      </div></>
  );
};

export default AddProduct;
