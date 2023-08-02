import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, TextField } from '@mui/material';

const ChooseCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
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
  const [shippingDetails, setShippingDetails] = useState({
    address1: '',
    address2: '',
    district: '',
    state: '',
    Country: '',
    email: '',
    phone: '',
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customerList');
        setCustomerList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomerList();
  }, []);

  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    const selected = customerList.find((customer) => customer._id === customerId);
    setSelectedCustomer(selected);
    setCustomerDetails(selected);
    setShippingDetails({
      address1: selected?.address1 || '',
      address2: selected?.address2 || '',
      district: selected?.district || '',
      state: selected?.state || '',
      Country: selected?.Country || '',
      email: selected?.email || '',
      phone: selected?.phone || '',
    });
    setIsEditable(false);
  };

  const handleShippingInputChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditShippingDetails = () => {
    setIsEditable(true);
  };

  return (
    <div>
      <Grid container spacing={2} style={{ padding: '10px' }}>
        <Grid item xs={6}>
          <div>
            <label htmlFor="customer">Select Customer:</label>
            <select id="customer" onChange={handleCustomerChange}>
              <option value="">Select a customer</option>
              {customerList.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
          </div>

          <h3>Customer Details:</h3>
          <TextField
            label="First Name"
            value={customerDetails.firstName}
            disabled={!isEditable}
            fullWidth
           
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                firstName: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Last Name"
            value={customerDetails.lastName}
            disabled={!isEditable}
            fullWidth
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                lastName: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Address 1"
            value={customerDetails.address1}
            disabled={!isEditable}
            fullWidth
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                address1: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Address 2"
            value={customerDetails.address2}
            disabled={!isEditable}
            fullWidth
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                address2: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="District"
            value={customerDetails.district}
            disabled={!isEditable}
            fullWidth
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                district: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="State"
            value={customerDetails.state}
            disabled={!isEditable}
            fullWidth
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                state: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Country"
            value={customerDetails.Country}
            disabled={!isEditable}
            fullWidth
            onChange={(event) =>
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                Country: event.target.value,
              }))
            }
            style={{ marginBottom: '10px' }}
          />
        </Grid>

        <Grid item xs={6} style={{ padding: '10px' }}>
          <h3>Shipping Information:</h3>
          <TextField
            label="Address 1"
            value={shippingDetails.address1}
            onChange={handleShippingInputChange}
            name="address1"
            placeholder="Address 1"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Address 2"
            value={shippingDetails.address2}
            onChange={handleShippingInputChange}
            name="address2"
            placeholder="Address 2"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="District"
            value={shippingDetails.district}
            onChange={handleShippingInputChange}
            name="district"
            placeholder="District"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="State"
            value={shippingDetails.state}
            onChange={handleShippingInputChange}
            name="state"
            placeholder="State"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Country"
            value={shippingDetails.Country}
            onChange={handleShippingInputChange}
            name="Country"
            placeholder="Country"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Email"
            value={shippingDetails.email}
            onChange={handleShippingInputChange}
            name="email"
            placeholder="Email"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Phone"
            value={shippingDetails.phone}
            onChange={handleShippingInputChange}
            name="phone"
            placeholder="Phone"
            fullWidth
            disabled={!isEditable}
            style={{ marginBottom: '10px' }}
          />
          {!isEditable && (
            <button type="button" onClick={handleEditShippingDetails}>
              Edit Shipping Details
            </button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ChooseCustomer;

