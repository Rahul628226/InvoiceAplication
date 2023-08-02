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

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCompany, setEditCompany] = useState({
    _id: '',
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
    image: '', // Add image field for editing
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Companyslist');
      setCompanies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setOpenDialog(true);
    setEditCompany(company);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this company?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteCompany/${id}`);
        setCompanies((prevCompanies) => prevCompanies.filter((company) => company._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditDialogClose = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
    setEditCompany({
      _id: '',
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
      image: '',
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      const formData = new FormData();
      formData.append('image', editCompany.image);

      await axios.put(`http://localhost:8080/api/updateCompany/${editCompany._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCompanies((prevCompanies) =>
        prevCompanies.map((company) => (company._id === editCompany._id ? editCompany : company))
      );
      handleEditDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageInputChange = (e) => {
    setEditCompany((prevCompany) => ({
      ...prevCompany,
      image: e.target.files[0],
    }));
  };

  return (
    <div style={{ padding: '100px' }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company._id}>
              <Card variant="outlined" style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {company.Name}
                  </Typography>
                  <img
                    src={company.image}
                    alt="Company"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Reduce the height of the image
                  />
                  <Typography variant="body2" color="text.secondary">
                    Address 1: {company.address1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address 2: {company.address2}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    District: {company.district}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    State: {company.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Country: {company.Country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {company.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {company.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pin: {company.pin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gstin No: {company.GstinNo}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton onClick={() => handleEditClick(company)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(company._id)}>
                      <Delete />
                    </IconButton>
                    <Link to="/managePayment" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <IconButton><AddCardIcon></AddCardIcon></IconButton>
                    </Link>
                    
                    <Link to="/addCompany" style={{ textDecoration: 'none', color: 'inherit' }}>
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
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="Name"
            value={editCompany.Name}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address 1"
            type="text"
            name="address1"
            value={editCompany.address1}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address 2"
            type="text"
            name="address2"
            value={editCompany.address2}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="District"
            type="text"
            name="district"
            value={editCompany.district}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="State"
            type="text"
            name="state"
            value={editCompany.state}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Country"
            type="text"
            name="Country"
            value={editCompany.Country}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            name="email"
            value={editCompany.email}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            name="phone"
            value={editCompany.phone}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Pin"
            type="text"
            name="pin"
            value={editCompany.pin}
            onChange={handleEditInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Gstin No"
            type="text"
            name="GstinNo"
            value={editCompany.GstinNo}
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

export default ManageCompany;
