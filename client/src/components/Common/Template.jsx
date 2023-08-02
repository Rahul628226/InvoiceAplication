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

const Template = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCompany, setEditCompany] = useState({
    _id: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/templatelist');
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

  const handleEditDialogClose = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
    setEditCompany({
      _id: '',
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
      setLoading(true);

      const formData = new FormData();
      formData.append('image', editCompany.image);

      await axios.put(`http://localhost:8080/api/updatetemplate/${editCompany._id}`, formData, {
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
    } finally {
      setLoading(false);
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
                  <img
                    src={company.image}
                    alt="Company"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton onClick={() => handleEditClick(company)}>
                      <Edit />
                    </IconButton>
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
          <input type="file" accept="image/*" onChange={handleImageInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateClick} disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Template;
