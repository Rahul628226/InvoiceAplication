
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, TextField, Button, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';
import './InvoiceTable.css';



import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import ChooseCustomer from './ChooseCustomer';
import ChooseProduct from './CooseProduct';

//date

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Main from '../Main';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function AddInvoice() {



    //date
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);

    // const currentDate = new Date().toISOString().slice(0, 10);


    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleStartTimeChange = (time) => {
        setStartTime(time);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleEndTimeChange = (time) => {
        setEndTime(time);
    };



    const [productList, setProductList] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productId: '',
        quantity: '',
        SGST: '',
        CGST: '',
        HSN: '',
        discount: '',
        totalPrice: '',
    });
    const [isSGSTEnabled, setIsSGSTEnabled] = useState(true);
    const [isCGSTEnabled, setIsCGSTEnabled] = useState(true);
    const [discount, setDiscount] = useState(0);
    const [Delivery, setDelivery] = useState(0);

    const [Tsgst1, setTsgst1] = useState(0);
    const [Tcgst1, setTcgst1] = useState(0);

    const [amountBeforeDiscount, setAmountBeforeDiscount] = useState(0);
    const [amountAfterDiscount, setAmountAfterDiscount] = useState(0);
    const [Subtotal, setSubtotal] = useState(0);

    const [Ttaxableamount, setTtaxableamount] = useState(0);
    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    // const [selectedlastName, setSelectedlastName] = useState(null);

    // const [selectedaddress1, setSelectedaddress1] = useState(null);
    // const [selectedaddress2, setSelectedaddress2] = useState(null);
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
    const [isEditable, setIsEditable] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [CustomerlastName, setCustomerlastName] = useState('');
    const [Customeraddress1, setCustomeraddress1] = useState('');
    const [Customeraddress2, setCustomeraddress2] = useState('');
    const [Customerdistrict, setCustomerdistrict] = useState('');
    const [Customerstate, setCustomerstate] = useState('');
    const [Customercountry, setCustomercountry] = useState('');

    const [CustomerGSTIN, setCustomerGSTIN] = useState('');
    const [CustomerPhNo, setCustomerPhNo] = useState('');

    const [deliveryCharge, setDeliveryCharge] = useState('');

    const[Date,setDate]=useState('');

    //calculation 

    const [sgst, setsgst] = useState(0);

    const [cgst, setcgst] = useState(0);


    //SGST GST insertion




    //shipping

    const [shippingaddress1, setshippingaddress1] = useState('');
    const [shippingaddress2, setshippingaddress2] = useState('');
    const [shippingdistrict, setshippingdistrict] = useState('');
    const [shippingstate, setshippingstate] = useState('');
    const [shippingcountry, setshippingcountry] = useState('');
    const [shippingpin, setshippingpin] = useState('');

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/ProductList');
                const productListWithDefaults = response.data.map((product) => ({
                    ...product,
                    // Set default CGST value to 0 if null
                }));
                setProductList(productListWithDefaults);
                console.log(productListWithDefaults); // Add this line to check the product data
            } catch (error) {
                console.error(error);
            }
        };


        const calculateProductCGST = (product) => {
            const productTotal = product.price * product.quantity;
            const discountAmount = (productTotal * discount) / 100;
            let totalAfterDiscount = productTotal - discountAmount;
            let tAmount = totalAfterDiscount;
            let b = 0;

            if (isCGSTEnabled && product.CGST !== null) {
                const cgst = (tAmount * product.CGST) / 100; // Use product.CGST here
                b += cgst;
            }

            return b; // Round the total to the nearest whole number
        };


        const fetchCustomerList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customerList');
                setCustomerList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductList();
        fetchCustomerList();
    }, []);

    useEffect(() => {
        const calculateAmounts = () => {
            let totalBeforeDiscount = 0;
            let totalAfterDiscount = 0;
            let sgst1 = 0;
            let cgst1 = 0;
            let tsgst = 0;
            let tcgst = 0;

            selectedProducts.forEach((product) => {
                const productTotal = product.price * product.quantity;
                totalBeforeDiscount += productTotal;
                const discountAmount = (productTotal * discount) / 100;
                let total = productTotal - discountAmount;
                let atotal = total;
                if (isSGSTEnabled) {
                    const sgst = (total * product.sgst) / 100;
                    sgst1 = (total * product.sgst) / 100;
                    tsgst += sgst1;
                    total += sgst;

                }
                if (isCGSTEnabled) {
                    const cgst = (atotal * product.cgst) / 100;
                    cgst1 = (atotal * product.cgst) / 100
                    tcgst += cgst1;
                    total += cgst;
                }
                totalAfterDiscount += (total);
            });

            setAmountBeforeDiscount(totalBeforeDiscount);
            setAmountAfterDiscount(totalAfterDiscount);
            setSubtotal(amountAfterDiscount + Delivery)
            setsgst(tsgst);
            setcgst(tcgst);
            setTcgst1(sgst);
            setTcgst1(sgst);
            setTtaxableamount(totalBeforeDiscount);
        };
        const handleShippingInputChange = (event) => {
            const { name, value } = event.target;
            setShippingDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
        calculateAmounts();
    }, [selectedProducts, discount, isSGSTEnabled, isCGSTEnabled]);

    const handleProductSelect = (productId) => {
        const selectedProduct = productList.find((product) => product._id === productId);
        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, selectedProduct]);
    };

    //*********************************************************************************************************** */

    const handleNewProductChange = (event) => {
        const { name, value } = event.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    //*********************************************************************************************************** */


    const handleShippingInputChange = (event) => {
        const { name, value } = event.target;
        setShippingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const [Tsgst, setTsgst] = useState(0);
    const handleAddProduct = () => {
        const selectedProduct = productList.find((product) => product._id === newProduct.productId);

        // Calculate SGST and CGST for the new product
        //const SGST = (selectedProduct.price * newProduct.quantity * (selectedProduct.sgst || 0)) / 100;
        //const CGST = (selectedProduct.price * newProduct.quantity * (selectedProduct.cgst || 0)) / 100;
        //setInp((inp) => ({ ...inp, [name]: value }));
        // const SGST=Tsgst
        let SGST = 0
        let CGST = 0
        const productTotal = selectedProduct.price * newProduct.quantity;
        const discountAmount = (productTotal * discount) / 100;

        // Calculate the total price after applying the discount
        const totalAfterDiscount = productTotal - discountAmount;

        let a = 0;
        let b = 0;
        let taxType1 = "";
        let taxType2 = "";

        if (isSGSTEnabled) {
            const sgst = (totalAfterDiscount * selectedProduct.sgst) / 100;
            a += sgst;
            taxType1 = "SGST";
            const SGST1 = (selectedProduct.price * newProduct.quantity * (selectedProduct.sgst || 0)) / 100;
            SGST += SGST1
        }

        if (isCGSTEnabled) {
            const cgst = (totalAfterDiscount * selectedProduct.cgst) / 100;
            b += cgst;
            taxType2 = "CGST";
            const CGST1 = (selectedProduct.price * newProduct.quantity * (selectedProduct.cgst || 0)) / 100;
            CGST += CGST1
        }

        setDeliveryCharge(Delivery)
        // Calculate the final total price
        const totalPrice = totalAfterDiscount + SGST + CGST;
        const taxableAmount = totalAfterDiscount;

        const productWithQuantity = {
            ...selectedProduct,
            quantity: newProduct.quantity,
            SGST,
            CGST,
            totalPrice,
            taxableAmount,
            taxType1,
            taxType2,
            sgst: selectedProduct.sgst,
            cgst: selectedProduct.cgst,

        };

        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, productWithQuantity]);

        // Clear the input fields
        setNewProduct({
            productId: '',
            quantity: '',
            HSN: '',
            SGST: '',
            CGST: '',
            discount: '',
            totalPrice: '',
            taxableAmount: '',
            taxType1: '',
            taxType2: '',
            Delivery: '',

        });
    };




    const handleDeleteProduct = (productId) => {
        const productIndex = selectedProducts.findIndex((product) => product._id === productId);
        if (productIndex !== -1) {
            const updatedSelectedProducts = [...selectedProducts];
            updatedSelectedProducts.splice(productIndex, 1);
            setSelectedProducts(updatedSelectedProducts);
        }
    };

    const handleUpdateQuantity = (productId, quantity) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.map((product) =>
                product._id === productId ? { ...product, quantity } : product
            )
        );
    };
    //sgstinsertion

    const handleUpdateSGSTAndCGST = (productId, SGST, CGST) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.map((product) =>
                product._id === productId ? { ...product, SGST, CGST } : product
            )
        );
    };

    const calculateProductTotal = (product) => {
        const productTotal = product.price * product.quantity;
        const discountAmount = (productTotal * discount) / 100;
        let totalAfterDiscount = productTotal - discountAmount;
        let tAmount = totalAfterDiscount;
        let a = 0;
        let b = 0;
        if (isSGSTEnabled) {
            const sgst = (totalAfterDiscount * product.sgst) / 100;
            a += sgst;
        }

        if (isCGSTEnabled) {
            const cgst = (tAmount * product.cgst) / 100;
            b += cgst;
        }

        return Math.round(totalAfterDiscount + a + b); // Round the total to the nearest whole number
    };

    //SGST

    const calculateProductSGST = (product) => {
        const productTotal = product.price * product.quantity;
        const discountAmount = (productTotal * discount) / 100;
        let totalAfterDiscount = productTotal - discountAmount;
        let tAmount = totalAfterDiscount;
        let a = 0;
        let b = 0;
        if (isSGSTEnabled) {
            const sgst = (totalAfterDiscount * product.sgst) / 100;
            a += sgst;
        }

        return (a); // Round the total to the nearest whole number
        setTsgst(a);
    };

    const calculateProductCGST = (product) => {
        const productTotal = product.price * product.quantity;
        const discountAmount = (productTotal * discount) / 100;
        let totalAfterDiscount = productTotal - discountAmount;
        let tAmount = totalAfterDiscount;
        let b = 0;

        if (isCGSTEnabled && product.cgst !== null) {
            const cgst = (tAmount * product.cgst) / 100;
            b += cgst;
        }

        return b; // Round the total to the nearest whole number
    };


    const handleCustomerChange = (event) => {
        const customerId = event.target.value;
        const selected = customerList.find((customer) => customer._id === customerId);
        setSelectedCustomer(selected);
        // setSelectedlastName(selected);
        // setSelectedaddress1(selected);
        // setSelectedaddress2(selected);

        //************************************************************* */
        setCustomerName(selected?.firstName || '');
        setCustomerlastName(selected?.lastName || '');
        setCustomeraddress1(selected?.address1 || '');
        setCustomeraddress2(selected?.address2 || '');
        setCustomerdistrict(selected?.district || '');
        setCustomerstate(selected?.state || '');
        setCustomercountry(selected?.Country || '');
        setCustomerGSTIN(selected?.GstinNo || '');
        setCustomerPhNo(selected?.phone || '');



        //shipping
        setshippingaddress1(selected?.address1 || '');
        setshippingaddress2(selected?.address2 || '');
        setshippingdistrict(selected?.district || '');
        setshippingstate(selected?.state || '');
        setshippingcountry(selected?.Country || '');
        setshippingpin(selected?.pin || '');

        //************************************************************* */
        setCustomerDetails({
            firstName: selected?.firstName || '',
            lastName: selected?.lastName || '',
            address1: selected?.address1 || '',
            address2: selected?.address2 || '',
            district: selected?.district || '',
            state: selected?.state || '',
            Country: selected?.Country || '',
            email: selected?.email || '',
            phone: selected?.phone || '',
            pin: selected?.pin || '',
            GstinNo: selected?.GstinNo || '',
        });
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

    const handleEditShippingDetails = () => {
        setIsEditable(true);
    };

    //**************************************************************************************************** */
    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };
    const handlelastNameChange = (event) => {
        setCustomerlastName(event.target.value);
    };
    const handleaddress1Change = (event) => {
        setCustomeraddress1(event.target.value);
    };
    const handleaddress2Change = (event) => {
        setCustomeraddress2(event.target.value);
    };

    const handledistrictChange = (event) => {
        setCustomerdistrict(event.target.value);
    };

    const handlestateChange = (event) => {
        setCustomerstate(event.target.value);
    };

    const handlecountryChange = (event) => {
        setCustomercountry(event.target.value);
    };

    const handleGSTINChange = (event) => {
        setCustomerGSTIN(event.target.value);
    }

    const handlePhnoChange = (event) => {
        setCustomerPhNo(event.target.value);
    }
    
    const handleDate=(event)=>{
        setDate(event.target.value);
    }


    //shipping

    const handleshippingaddress1change = (event) => {
        setshippingaddress1(event.target.value);
    }


    const handleshippingaddress2change = (event) => {
        setshippingaddress2(event.target.value);
    }

    const handleshippingdistrictchange = (event) => {
        setshippingdistrict(event.target.value);
    }

    const handleshippingstatechange = (event) => {
        setshippingstate(event.target.value);
    }

    const handleshippingcountrychange = (event) => {
        setshippingcountry(event.target.value);
    }

    const handleshippingpinchange = (event) => {
        setshippingpin(event.target.value);
    }
    //**************************************************************************************************** */

    const handleSaveInvoice = async () => {
        try {
            const formData = {
                firstName: customerName,
                lastName: CustomerlastName,
                address1: Customeraddress1,
                address2: Customeraddress2,
                district: Customerdistrict,
                state: Customerstate,
                country: Customercountry,
                GSTIN: CustomerGSTIN,
                PhNo: CustomerPhNo,
                Date:Date,

                //shipping

                shippingaddress1: shippingaddress1,
                shippingaddress2: shippingaddress2,
                shippingdistrict: shippingdistrict,
                shippingstate: shippingstate,
                shippingcountry: shippingcountry,
                shippingpin: shippingpin,


                products: selectedProducts,
                Delivery: Delivery,
                Subtotal: Delivery + amountAfterDiscount,
                Tsgst1: sgst,
                Tcgst1: cgst,
                Ttaxableamount: amountBeforeDiscount,
            };

            //**************************************************************************************************** */

            const response = await axios.post('http://localhost:8080/api/addInvoice', formData);
            console.log(response.data);
            // Add your desired action after saving the invoice (e.g., show a success message, reset the form)
            setCustomerName('');
            setCustomerlastName('');
            setCustomeraddress1('');
            setCustomeraddress2('');
            setCustomerdistrict('');
            setCustomerstate('');
            setCustomercountry('');
            setCustomerGSTIN('');
            setCustomerPhNo('');


            setDeliveryCharge();
            setSubtotal();
            setTcgst1();
            setTsgst1();
            setTtaxableamount();



            //shipping
            setshippingaddress1('');
            setshippingaddress2('');
            setshippingdistrict('');
            setshippingstate('');
            setshippingcountry('');
            setshippingpin('');


            //product

            setSelectedProducts([]);
            setNewProduct({
                productId: '',
                quantity: '',
                HSN: '',
                SGST: '',
                CGST: '',
                discount: '',

            });
        } catch (error) {
            console.error(error);
            // Handle any errors that occur during saving the invoice
        }
    };



    const [selectedValue, setSelectedValue] = useState('Invoice');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [selectedValue2, setSelectedValue2] = useState('Open');

    const handleChange2 = (event) => {
        setSelectedValue2(event.target.value);
    };



    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [selectedDate2, setSelectedDate2] = useState(null);

    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
    };

    return (
        <><Main/>
        <div style={{ paddingLeft: '260px' }}>

            <h4>Invoice</h4>

            <div style={{ paddingLeft: '600px' }}>
                {/* //select type */}
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="body1">  Select Type</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl>
                            <Select
                                labelId="dropdown-label"
                                id="dropdown"
                                value={selectedValue}
                                onChange={handleChange}
                                sx={{ minWidth: 200 }}
                            >
                                {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>  */}
                                <MenuItem value="Invoice">Invoice</MenuItem>
                                <MenuItem value="Quote">Quote</MenuItem>
                                <MenuItem value="Receipt">Receipt</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl>
                            <Select
                                labelId="dropdown-label"
                                id="dropdown"
                                value={selectedValue2}
                                onChange={handleChange2}
                                sx={{ minWidth: 200 }}
                            >
                                {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Pad">Paid</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={2}>
                        <Typography variant="body1">Select date</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl>
                            <TextField type='date' value={Date} onChange={handleDate} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl>
                            <TextField type='date'>

                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>



            </div>
        </div >



            <><Grid item>
                <Paper>
                    <Box p={2}> {/* Navigation bar */}

                    </Box>
                </Paper>
            </Grid>

                <Grid item xs>
                    <Paper>
                        <Box p={10}> {/* Content section */}
                            <div style={{ paddingLeft: '200px' }}>


                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Paper>
                                            <Box p={2}> {/* Customer details Content for the left section */}




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
                                                                label="GSTIN NO"
                                                                value={CustomerGSTIN}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={handleGSTINChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />


                                                            <TextField
                                                                label="First Name"
                                                                value={customerName}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={handleCustomerNameChange}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Last Name"
                                                                value={CustomerlastName}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={(event) =>
                                                                    handlelastNameChange
                                                                }
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Address 1"
                                                                value={Customeraddress1}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={handleaddress1Change

                                                                }
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Address 2"
                                                                value={Customeraddress2}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={handleaddress2Change
                                                                }
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="District"
                                                                value={Customerdistrict}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={
                                                                    handledistrictChange
                                                                }
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="State"
                                                                value={Customerstate}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={handlestateChange
                                                                }
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Country"
                                                                value={Customercountry}
                                                                disabled={!isEditable}
                                                                fullWidth
                                                                onChange={handlecountryChange
                                                                }
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={6} style={{ padding: '14px' }}>
                                                            <br /><br></br>
                                                            <h3>Shipping Information:</h3>
                                                            <TextField
                                                                label="Address 1"
                                                                value={shippingaddress1}
                                                                onChange={handleshippingaddress1change}
                                                                name="address1"
                                                                placeholder="Address 1"
                                                                fullWidth
                                                                disabled={!isEditable}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Address 2"
                                                                value={shippingaddress2}
                                                                onChange={handleshippingaddress2change}
                                                                name="address2"
                                                                placeholder="Address 2"
                                                                fullWidth
                                                                disabled={!isEditable}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="District"
                                                                value={shippingdistrict}
                                                                onChange={handleshippingdistrictchange}
                                                                name="district"
                                                                placeholder="District"
                                                                fullWidth
                                                                disabled={!isEditable}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="State"
                                                                value={shippingstate}
                                                                onChange={handleshippingstatechange}
                                                                name="state"
                                                                placeholder="State"
                                                                fullWidth
                                                                disabled={!isEditable}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Country"
                                                                value={shippingcountry}
                                                                onChange={handleshippingcountrychange}
                                                                name="Country"
                                                                placeholder="Country"
                                                                fullWidth
                                                                disabled={!isEditable}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Pin"
                                                                value={shippingpin}
                                                                onChange={handleshippingpinchange}
                                                                name="pin"
                                                                placeholder="Pin"
                                                                fullWidth
                                                                disabled={!isEditable}
                                                                style={{ marginBottom: '10px' }}
                                                            />
                                                            <TextField
                                                                label="Phone"
                                                                value={CustomerPhNo}
                                                                onChange={handlePhnoChange}
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


















                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper>
                                            <Box p={2}> {/* Content for the right section */}






                                                <div>
                                                    <h3>Select a Product:</h3>
                                                    <select name="productId" value={newProduct.productId} onChange={handleNewProductChange}>
                                                        <option value="">Select a product</option>
                                                        {productList.map((product) => (
                                                            <option key={product._id} value={product._id}>
                                                                {product.PName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        value={newProduct.quantity}
                                                        onChange={handleNewProductChange}
                                                        placeholder="Quantity"
                                                    />
                                                    <Grid item xs={6}>
                                                        <h3>Tax:</h3>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={isSGSTEnabled}
                                                                onChange={() => setIsSGSTEnabled(!isSGSTEnabled)}
                                                            />{' '}
                                                            SGST
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={isCGSTEnabled}
                                                                onChange={() => setIsCGSTEnabled(!isCGSTEnabled)}
                                                            />{' '}
                                                            CGST
                                                        </label>
                                                    </Grid>

                                                    <button type="button" onClick={handleAddProduct}>
                                                        Add Product
                                                    </button>

                                                    <h3>Selected Products:</h3>

                                                    <TableContainer component={Paper} className="invoice-table">
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Product Name</TableCell>
                                                                    <TableCell>HSN</TableCell>
                                                                    <TableCell>Price</TableCell>
                                                                    <TableCell>Quantity</TableCell>
                                                                    <TableCell>SGST</TableCell>
                                                                    <TableCell>CGST</TableCell>
                                                                    <TableCell>Total Price</TableCell>
                                                                    <TableCell>Actions</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {selectedProducts.map((product) => (
                                                                    <TableRow key={product._id}>
                                                                        <TableCell>{product.PName}</TableCell>
                                                                        <TableCell onChange={handleNewProductChange}>{product.HSN}</TableCell>
                                                                        <TableCell>{product.price}</TableCell>
                                                                        <TableCell>{product.quantity}</TableCell>
                                                                        {/* <TableCell> <input
                                                                            type="number"
                                                                            value={product.quantity}
                                                                            onChange={(event) => handleUpdateQuantity(product._id, event.target.value)}
                                                                        /></TableCell> */}
                                                                        <TableCell ><label  >{calculateProductSGST(product)}</label></TableCell>
                                                                        <TableCell>{calculateProductCGST(product)}</TableCell>
                                                                        <TableCell onChange={calculateProductTotal(product)} value={newProduct.CGST}>{calculateProductTotal(product)}</TableCell>

                                                                        <TableCell class="product-row"><IconButton
                                                                            className="delete-button"
                                                                            onClick={() => handleDeleteProduct(product._id)}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton></TableCell>
                                                                    </TableRow>

                                                                ))}

                                                            </TableBody>


                                                        </Table>
                                                    </TableContainer>


                                                    <div>
                                                        <form>
                                                            <Grid container spacing={2}>
                                                                {/* <Grid item xs={6}>
                                                                    <h3>Tax:</h3>
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isSGSTEnabled}
                                                                            onChange={() => setIsSGSTEnabled(!isSGSTEnabled)}
                                                                        />{' '}
                                                                        SGST
                                                                    </label>
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isCGSTEnabled}
                                                                            onChange={() => setIsCGSTEnabled(!isCGSTEnabled)}
                                                                        />{' '}
                                                                        CGST
                                                                    </label>
                                                                </Grid> */}



                                                                <Grid item xs={6}>

                                                                </Grid>
                                                                {/* <Grid item xs={6}>
                                                                    <h3>Discount:</h3>
                                                                    <input
                                                                        type="number"
                                                                        value={discount}
                                                                        onChange={(event) => setDiscount(Number(event.target.value))}
                                                                        placeholder="Discount (%)"
                                                                    />
                                                                </Grid> */}
                                                                <Grid item xs={6}>
                                                                    <h3>Tax Amount:</h3>
                                                                    <h3 onChange={(event) => setTsgst1(sgst)}>SGST:{sgst}</h3>
                                                                    <h3 onChange={(event) => setTcgst1(cgst)}>CGST:{cgst}</h3>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <h3>Delivery Charges:</h3>
                                                                    <input
                                                                        type="number"
                                                                        value={Delivery}
                                                                        onChange={(event) => setDelivery(Number(event.target.value))}
                                                                        placeholder="Charge"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <h3>        </h3><br></br>
                                                                    <h3 onChange={(event) => setTtaxableamount(amountBeforeDiscount)}>Taxable Amount: {amountBeforeDiscount}</h3>
                                                                    <h3 value={Subtotal} onChange={(event) => setSubtotal(amountAfterDiscount + Delivery)}>Sub Total: {amountAfterDiscount + Delivery}</h3>
                                                                </Grid>

                                                            </Grid>

                                                        </form>



                                                    </div>

                                                    <div>


                                                    </div>

                                                    <div>



                                                    </div>

                                                </div>

                                                <Button type="button" variant="contained" color="primary" onClick={handleSaveInvoice}>
                                                    Add Invoice
                                                </Button>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>


                            </div>
                        </Box>
                    </Paper>
                </Grid>
            </></>

    );
}