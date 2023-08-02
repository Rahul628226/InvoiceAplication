import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Container,
    Box,
    MenuItem,
} from '@mui/material';
const units = ['Piece', 'Kilogram', 'Gram', 'Liter', 'Milliliter', 'Meter', 'Centimeter']; // Array of unit options
const Manageproduct = () => {
    const [products, setproducts] = useState([]);
    const [selectedproducts, setSelectedproducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editproduct, setEditproduct] = useState({
        _id: '',
        HSN: '',
        PName: '',
        price: '',
        unit: '',
        quantity: '',
        sgst:'',
        cgst:'',
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchproducts();
    }, [searchQuery]);

    const fetchproducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ProductList?search=${searchQuery}`);
            setproducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteproduct = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/deleteProduct/${id}`);
                setproducts((prevproducts) => prevproducts.filter((product) => product._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSelectproduct = (id) => {
        if (selectedproducts.includes(id)) {
            setSelectedproducts((prevSelected) => prevSelected.filter((productId) => productId !== id));
        } else {
            setSelectedproducts((prevSelected) => [...prevSelected, id]);
        }
    };

    const handleEditClick = (product) => {
        setEditproduct(product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditproduct((prevproduct) => ({
            ...prevproduct,
            [name]: value,
        }));
    };

    const handleUpdateClick = async () => {
        try {
            await axios.put(`http://localhost:8080/api/updateProduct/${editproduct._id}`, editproduct);
            setproducts((prevproducts) =>
                prevproducts.map((product) => (product._id === editproduct._id ? editproduct : product))
            );
            setOpenDialog(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredproducts = products.filter((product) =>
        product.PName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '100px', gap: '20px' }}>

            <Container maxWidth="md" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={handleSearch}

                    style={{ marginBottom: '10px', minWidth: '800px' }}
                />
                <Table style={{ border: '1px solid #ccc', borderCollapse: 'collapse', margin: '0 auto', minWidth: '800px' }}>

                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                HSN/SAC
                            </TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                Product Name
                            </TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                Price
                            </TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                Quantity
                            </TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                Unit
                            </TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                SGST
                            </TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                CGST
                            </TableCell>

                            <TableCell style={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>ACTIONS</TableCell>
                            <TableCell style={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredproducts.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.HSN}
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.PName}
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.price}
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.quantity}
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.unit}
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.sgst}
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                    {product.cgst}
                                </TableCell>

                                <TableCell style={{ borderBottom: '1px solid #ccc' }}>
                                    <Button variant="outlined" onClick={() => handleEditClick(product)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell style={{ borderBottom: '1px solid #ccc' }}>
                                    <Button variant="outlined" onClick={() => deleteproduct(product._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="HSN/SAC"
                        type="text"
                        name="HSN"
                        value={editproduct.HSN}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Product Name"
                        type="text"
                        name="PName"
                        value={editproduct.PName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="text"
                        name="price"
                        value={editproduct.price}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="text"
                        name="quantity"
                        value={editproduct.quantity}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        select
                        label="Unit"
                        onChange={handleChange}
                        name="unit"
                        value={editproduct.unit}
                        fullWidth
                        required
                    >
                        {units.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                                {unit}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        label="SGSt %"
                        type="text"
                        name="sgst"
                        value={editproduct.sgst}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="CGST %"
                        type="text"
                        name="cgst"
                        value={editproduct.cgst}
                        onChange={handleChange}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleUpdateClick}>Save</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Manageproduct;  