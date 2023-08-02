import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, MenuItem } from '@mui/material';
import axios from 'axios';
import Main from '../Main';

const AddPayment = () => {
    const [inp, setInp] = useState({
        BName: '',
        AccountNo: '',
        IFSC: '',
        HolderName: '',

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
            formData.append('BName', inp.BName);
            formData.append('AccountNo', inp.AccountNo);
            formData.append('IFSC', inp.IFSC);
            formData.append('HolderName', inp.HolderName);
            formData.append('image', inp.image);

            formData.append('language1', inp.language1);


            const response = await axios.post('http://localhost:8080/api/addPayment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);

            setSuccessMessage('Added successfully!');

            setInp({
                BName: '',
                AccountNo: '',
                IFSC: '',
                HolderName: '',

                image: null,
                language1: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <><div>
            <Main />
        </div><div style={{ paddingTop: '60px' }}>
                <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Add Payment Details
                    </Typography>
                    <form>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    label="Bank Name"
                                    onChange={inpHandler}
                                    name="BName"
                                    value={inp.BName}
                                    fullWidth
                                    required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Bank Account No"
                                    onChange={inpHandler}
                                    name="AccountNo"
                                    value={inp.AccountNo}
                                    fullWidth
                                    required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Bank IFSC Code"
                                    onChange={inpHandler}
                                    name="IFSC"
                                    value={inp.IFSC}
                                    fullWidth
                                    required />
                            </Grid>




                            <Grid item xs={6}>
                                <TextField
                                    label="Account Holder's Name"
                                    onChange={inpHandler}
                                    name="HolderName"
                                    value={inp.HolderName}
                                    fullWidth
                                    required />
                            </Grid>


                            <Grid item xs={6}>
                                <TextField
                                    type="file"
                                    label="Image"
                                    onChange={inpHandler}
                                    name="image"
                                    fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    onChange={inpHandler}
                                    name="language1"
                                    value={inp.language1}
                                    style={{ display: inp.language1 ? 'block' : 'none' }} />
                            </Grid>
                            {successMessage && (
                                <Typography variant="body1" align="center" color="success" gutterBottom>
                                    {successMessage}
                                </Typography>
                            )}
                            <Grid item xs={12}>
                                <Button type="button" variant="contained" color="primary" onClick={clickHandler}>
                                    Add Payment
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div></>
    );
};

export default AddPayment;