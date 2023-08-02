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
} from '@mui/material';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCustomer, setEditCustomer] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    district: '',
    state: '',
    Country: '',
    email: '',
    phone: '',
    pin: '',
    GstinNo: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/customerList?search=${searchQuery}`);
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteCustomer/${id}`);
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers((prevSelected) => prevSelected.filter((customerId) => customerId !== id));
    } else {
      setSelectedCustomers((prevSelected) => [...prevSelected, id]);
    }
  };

  const handleEditClick = (customer) => {
    setEditCustomer(customer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:8080/api/updateCustomer/${editCustomer._id}`, editCustomer);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) => (customer._id === editCustomer._id ? editCustomer : customer))
      );
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '100px', gap: '20px' }}>
      
      <Container maxWidth="md" style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearch}
        
        style={{ marginBottom: '10px',minWidth: '800px' }}
      />
        <Table style={{ border: '1px solid #ccc', borderCollapse: 'collapse', margin: '0 auto', minWidth: '800px' }}>
            
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                First Name
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Last Name
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Address
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                District
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                State
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Country
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Email
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Phone
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Pin
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                Gstin No
              </TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>ACTIONS</TableCell>
              <TableCell style={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.firstName}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.lastName}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.address1}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.district}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.state}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.Country}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.email}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.phone}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.pin}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                  {customer.GstinNo}
                </TableCell>
                <TableCell style={{ borderBottom: '1px solid #ccc' }}>
                  <Button variant="outlined" onClick={() => handleEditClick(customer)}>
                    Edit
                  </Button>
                  </TableCell>
                  <TableCell style={{ borderBottom: '1px solid #ccc' }}>
                  <Button variant="outlined" onClick={() => deleteCustomer(customer._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            name="firstName"
            value={editCustomer.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            name="lastName"
            value={editCustomer.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address 1"
            type="text"
            name="address1"
            value={editCustomer.address1}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address 2"
            type="text"
            name="address2"
            value={editCustomer.address2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="District"
            type="text"
            name="district"
            value={editCustomer.district}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="State"
            type="text"
            name="state"
            value={editCustomer.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Country"
            type="text"
            name="Country"
            value={editCustomer.Country}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            name="email"
            value={editCustomer.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            name="phone"
            value={editCustomer.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Pin"
            type="text"
            name="pin"
            value={editCustomer.pin}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Gstin No"
            type="text"
            name="GstinNo"
            value={editCustomer.GstinNo}
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

export default ManageCustomer;


