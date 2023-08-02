import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    IconButton,
    Dialog,
    TextField,
    Button,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ManagePayment = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editPayment, setEditPayment] = useState({
        _id: '',
        BName: '',
        AccountNo: '',
        IFSC: '',
        HolderName: '',
        image: '', // Add image field for editing
    });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Paymentslist');
            setCompanies(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (Payment) => {
        setSelectedPayment(Payment);
        setOpenDialog(true);
        setEditPayment(Payment);
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Payment?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/deletePayment/${id}`);
                setCompanies((prevCompanies) => prevCompanies.filter((Payment) => Payment._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEditDialogClose = () => {
        setOpenDialog(false);
        setSelectedPayment(null);
        setEditPayment({
            _id: '',
        BName: '',
        AccountNo: '',
        IFSC: '',
        HolderName: '',
        image: '', // Add image field for editing
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value,
        }));
    };

    const handleUpdateClick = async () => {
        try {
            const formData = new FormData();
            formData.append('image', editPayment.image);

            await axios.put(`http://localhost:8080/api/updatePayment/${editPayment._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setCompanies((prevCompanies) =>
                prevCompanies.map((Payment) => (Payment._id === editPayment._id ? editPayment : Payment))
            );
            handleEditDialogClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageInputChange = (e) => {
        setEditPayment((prevPayment) => ({
            ...prevPayment,
            image: e.target.files[0],
        }));
    };

    return (
        <div style={{ padding: '100px' }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    {companies.map((Payment) => (
                        <Grid item xs={12} sm={6} md={4} key={Payment._id}>
                            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {Payment.Name}
                                    </Typography>
                                    <img
                                        src={Payment.image}
                                        alt="Payment"
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Reduce the height of the image
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Address 1: {Payment.BName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Address 2: {Payment.AccountNo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        District: {Payment.IFSC}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        State: {Payment.HolderName}
                                    </Typography>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <IconButton onClick={() => handleEditClick(Payment)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(Payment._id)}>
                                            <Delete />
                                        </IconButton>
                                        

                                        <Link to="/addPayment" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <IconButton>
                                                <AddIcon></AddIcon>
                                            </IconButton>
                                        </Link>

                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Edit Dialog */}
            <Dialog open={openDialog} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Payment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Bank Name"
                        type="text"
                        name="BName"
                        value={editPayment.BName}
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Account No"
                        type="text"
                        name="AccountNo"
                        value={editPayment.AccountNo}
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="IFSC Code"
                        type="text"
                        name="IFSC"
                        value={editPayment.IFSC}
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Account Holder Name"
                        type="text"
                        name="HolderName"
                        value={editPayment.HolderName}
                        onChange={handleEditInputChange}
                        fullWidth
                    />
                   
                    
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleUpdateClick}>Save</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManagePayment;