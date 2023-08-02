import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper,
  Grid,
  IconButton,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ChooseProduct() {
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productId: '',
    quantity: '',
    SGST: '',
    CGST: '',
  });
  const [isSGSTEnabled, setIsSGSTEnabled] = useState(false);
  const [isCGSTEnabled, setIsCGSTEnabled] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [Delivery, setDelivery] = useState(0);
  const [amountBeforeDiscount, setAmountBeforeDiscount] = useState(0);
  const [amountAfterDiscount, setAmountAfterDiscount] = useState(0);
  const [sgst, setSGST] = useState(0);
  const [cgst, setCGST] = useState(0);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ProductList');
        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductList();
  }, []);

  useEffect(() => {
    const calculateAmounts = () => {
      let totalBeforeDiscount = 0;
      let totalAfterDiscount = 0;
      let totalSGST = 0;
      let totalCGST = 0;

      selectedProducts.forEach((product) => {
        const productTotal = product.price * product.quantity;
        totalBeforeDiscount += productTotal;

        const discountAmount = (productTotal * discount) / 100;
        let total = productTotal - discountAmount;
        let sgstAmount = 0;
        let cgstAmount = 0;

        if (isSGSTEnabled) {
          sgstAmount = (total * product.SGST) / 100;
          totalSGST += sgstAmount;
          total += sgstAmount;
        }

        if (isCGSTEnabled) {
          cgstAmount = (total * product.CGST) / 100;
          totalCGST += cgstAmount;
          total += cgstAmount;
        }

        totalAfterDiscount += total;
      });

      setAmountBeforeDiscount(totalBeforeDiscount);
      setAmountAfterDiscount(totalAfterDiscount);
      setSGST(totalSGST);
      setCGST(totalCGST);
    };

    calculateAmounts();
  }, [selectedProducts, discount, isSGSTEnabled, isCGSTEnabled]);

  const handleProductSelect = (productId) => {
    const selectedProduct = productList.find((product) => product._id === productId);
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, selectedProduct]);
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const selectedProduct = productList.find((product) => product._id === newProduct.productId);
    const productWithQuantity = {
      ...selectedProduct,
      quantity: newProduct.quantity,
      SGST: Number(newProduct.SGST),
      CGST: Number(newProduct.CGST),
    };

    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, productWithQuantity]);
    setNewProduct({
      productId: '',
      quantity: '',
      SGST: '',
      CGST: '',
    });
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product._id !== productId)
    );
  };

  const calculateProductSGST = (product) => {
    // Calculation for product SGST
    // You can customize this calculation based on your requirements
    return isSGSTEnabled ? (product.price * product.quantity * product.SGST) / 100 : 0;
  };

  const calculateProductCGST = (product) => {
    // Calculation for product CGST
    // You can customize this calculation based on your requirements
    return isCGSTEnabled ? (product.price * product.quantity * product.CGST) / 100 : 0;
  };

  const calculateProductTotal = (product) => {
    // Calculation for product total after taxes and discount
    // You can customize this calculation based on your requirements
    const productTotal = product.price * product.quantity;
    const discountAmount = (productTotal * discount) / 100;
    const total = productTotal - discountAmount;

    if (isSGSTEnabled) {
      return total + calculateProductSGST(product);
    }

    if (isCGSTEnabled) {
      return total + calculateProductCGST(product);
    }

    return total;
  };

  const handleSaveInvoice = async () => {
    // Logic for saving the invoice
    // You can implement this based on your requirements
    try {
      const formData = {
        // Your form data here
      };

      const response = await axios.post('http://localhost:8080/api/addInvoice', formData);
      console.log(response.data);
      // Add your desired action after saving the invoice (e.g., show a success message, reset the form)
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during saving the invoice
    }
  };

  return (
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
      <input
        type="number"
        name="SGST"
        value={newProduct.SGST}
        onChange={handleNewProductChange}
        placeholder="SGST"
      />
      <input
        type="number"
        name="CGST"
        value={newProduct.CGST}
        onChange={handleNewProductChange}
        placeholder="CGST"
      />
      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>

      <h3>Selected Products:</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
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
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{calculateProductSGST(product)}</TableCell>
                <TableCell>{calculateProductCGST(product)}</TableCell>
                <TableCell>{calculateProductTotal(product)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteProduct(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <h3>Tax:</h3>
        <label>
          <input type="checkbox" checked={isSGSTEnabled} onChange={() => setIsSGSTEnabled(!isSGSTEnabled)} />
          SGST
        </label>
        <label>
          <input type="checkbox" checked={isCGSTEnabled} onChange={() => setIsCGSTEnabled(!isCGSTEnabled)} />
          CGST
        </label>
      </div>
      <div>
        <h3>Delivery Charges:</h3>
        <input
          type="number"
          value={Delivery}
          onChange={(event) => setDelivery(Number(event.target.value))}
          placeholder="Charge"
        />
      </div>
      <div>
        <h3>Discount:</h3>
        <input
          type="number"
          value={discount}
          onChange={(event) => setDiscount(Number(event.target.value))}
          placeholder="Discount (%)"
        />
      </div>
      <div>
        <h3>Tax Amount:</h3>
        <h3>SGST: {sgst}</h3>
        <h3>CGST: {cgst}</h3>
      </div>
      <div>
        <h3>Taxable Amount: {amountBeforeDiscount}</h3>
        <h3>Sub Total: {amountAfterDiscount + Delivery}</h3>
      </div>
      <Button variant="contained" onClick={handleSaveInvoice}>
        Save Invoice
      </Button>
    </div>
  );
}
