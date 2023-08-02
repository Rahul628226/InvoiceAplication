import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, MenuItem } from '@mui/material';
import axios from 'axios';

const AddCompany = () => {
    const [inp, setInp] = useState({
        Name: '',
        address1: '',
        address2: '',
        district: '',
        state: '',
        Country: '',
        email: '',
        phone: '',
        pin: '',
        GstinNo: '',
        image: null,
        language1: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const inpHandler = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setInp((inp) => ({ ...inp, image: files[0] }));
        } else {
            setInp((inp) => ({ ...inp, [name]: value }));
        }
    };

    const clickHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('Name', inp.Name);
            formData.append('address1', inp.address1);
            formData.append('address2', inp.address2);
            formData.append('district', inp.district);
            formData.append('image', inp.image);
            formData.append('state', inp.state);

            formData.append('Country', inp.Country);
            formData.append('email', inp.email);
            formData.append('pin', inp.pin);

            formData.append('GstinNo', inp.GstinNo);
            formData.append('language1', inp.language1);
       

            const response = await axios.post('http://localhost:8080/api/addcompany', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);

            setSuccessMessage('Added successfully!');

            setInp({
                Name: '',
                address1: '',
                address2: '',
                district: '',
                state: '',
                Country: '',
                email: '',
                phone: '',
                pin: '',
                GstinNo: '',
                image: null,
                language1: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ paddingTop: '60px' }}>
            <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Company Details
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12}>
                            <TextField
                                label="Company Name"
                                onChange={inpHandler}
                                name="Name"
                                value={inp.Name}
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
                                required
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                label="State"
                                onChange={inpHandler}
                                name="state"
                                value={inp.state}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Country"
                                onChange={inpHandler}
                                name="Country"
                                value={inp.Country}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Pin"
                                onChange={inpHandler}
                                name="pin"
                                value={inp.pin}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                onChange={inpHandler}
                                name="email"
                                value={inp.email}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Phone"
                                onChange={inpHandler}
                                name="phone"
                                value={inp.phone}
                                fullWidth
                                required
                            />
                        </Grid>

                        

                        <Grid item xs={6}>
                            <TextField
                                label="GSTIN"
                                onChange={inpHandler}
                                name="GstinNo"
                                value={inp.GstinNo}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                type="file"
                                label="Image"
                                onChange={inpHandler}
                                name="image"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                onChange={inpHandler}
                                name="language1"
                                value={inp.language1}
                                style={{ display: inp.language1 ? 'block' : 'none' }}
                            />
                        </Grid>
                        {successMessage && (
                            <Typography variant="body1" align="center" color="success" gutterBottom>
                                {successMessage}
                            </Typography>
                        )}
                        <Grid item xs={12}>
                            <Button type="button" variant="contained" color="primary" onClick={clickHandler}>
                                Add Company
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default AddCompany;