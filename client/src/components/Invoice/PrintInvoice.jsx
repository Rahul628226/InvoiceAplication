import React, { useEffect, useState } from 'react';
import { Document, Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';
import backgroundImage from '../Image/Invoice6.png'; // Replace this with your image path
import { Grid } from '@mui/material';
import axios from 'axios';
import logoImage from './Logo/logo.png';
import numberToWords from 'number-to-words';
//import { Document, Page, StyleSheet, View, Image, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },


  logo: {
    position: 'absolute',
    top: 20, // Adjust the top position as needed
    left: 20, // Adjust the left position as needed
    width: '50%', // Adjust the width of the logo
    height: '50%', // Adjust the height of the logo
    zIndex: 1, // Make sure the logo appears above the background image
  },

  container: {
    flexGrow: 1,
    paddingTop: 10,
  },
  header: {
    fontSize: 10,
    marginBottom: 10,
    paddingLeft: 10,

  },

  header2: {
    fontSize: 10,
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  table2: {
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'black',
    width: '50%', // Adjust the width to 33.33% (1/3)
    padding: 10,
    marginRight: 5,

  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Add margin at the bottom to separate the first table from the second/third row
  },
  table: {
    marginTop: 3,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'black',
    width: '100%', // Adjust the width to 33.33% (1/3)
    padding: 10,
    marginRight: 5,
  },
  tableRow: {
    flexDirection: 'row',
    fontSize: 10,
  },
  tableRow12: {
    flexDirection: 'row',
    fontSize: 10,
    padding: 5,
  },
  tableCell: {
    borderWidth: 0,
    borderColor: 'black',
    padding: 8,
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  tableHeader: {
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },

  columnContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between', // To evenly space the columns
    paddingHorizontal: 20, // Add horizontal padding to create a gap between columns
  },
  customerDetailsColumn: {
    flex: 1,
    marginRight: 20, // Add a margin to create a gap between customer details and supply address
  },

});


const PDFInvoice = ({ invoice }) => {
  const [backgroundImageBase64, setBackgroundImageBase64] = useState('');
  const [logoImageBase64, setLogoImageBase64] = useState('');
  const [companies, setCompanies] = useState([]);
  const [payments, setpayment] = useState([]);


  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Companyslist');
      setCompanies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPayment = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Paymentslist');
      setpayment(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Load the background image and convert it to base64
    const loadImage = async () => {
      try {
        const response = await fetch(backgroundImage);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          setBackgroundImageBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error('Failed to load the background image:', e);
      }
    };





    const loadLogoImage = async () => {
      try {
        const response = await fetch(logoImage);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          setLogoImageBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error('Failed to load the logo image:', e);
      }
    };

    fetchCompanies();
    fetchPayment();

    loadImage();
    loadLogoImage();
  }, []);

  if (!invoice || !backgroundImageBase64 || !logoImageBase64) {
    // Return null if invoice data or background image or logo image is not available
    return null;
  }





  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Use Image component to set the image as a background */}
        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image style={styles.backgroundImage} src={backgroundImageBase64} />

          <View style={styles.customerDetailsColumn}>
            <Text style={styles.header}>     { }</Text>
            <Text style={styles.header}>        { }</Text>
            <Text style={styles.header}>  </Text>
          </View>

          {/* Logo
                <Image style={styles.logo} src={logoImageBase64} /> */}

          <View style={styles.container}>
            <View style={styles.columnContainer1}>
              {/* Customer Details */}
              <View style={styles.customerDetailsColumn}>
              <Text style={styles.header2}>{}</Text>
              <Text style={styles.header2}>{}</Text>
              <Text style={styles.header2}>{}</Text>
                <Text style={styles.header2}>Estimated For:</Text>
                <Text style={styles.header2}>{invoice.firstName} {invoice.lastName}</Text>
                <Text style={styles.header}>{invoice.address1} {invoice.address2} {invoice.district}</Text>
                <Text style={styles.header}>Contact No: {invoice.PhNo}</Text>
                <Text style={styles.header}>GSTIN Number: {invoice.GSTIN}</Text>
                <Text style={styles.header}>State: {invoice.state}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.header}>     { }</Text>
                <Text style={styles.header}>      { }</Text>
                <Text style={styles.header}>     { }</Text>
                <Text style={styles.header}>        { }</Text>
                <Text style={styles.header}>                           { }</Text>
              </View>
              {/* Supply Address C:\Users\Rahul\OneDrive\Desktop\InvoiceApplication\client\src\components\Company\AddCompanyInfo.jsx*/}
              <View style={{ flex: 1 }}>
                <Text style={styles.header}>     { }</Text>
                <Text style={styles.header}>      { }</Text>
                <Text style={styles.header2}>{}</Text>
                <Text style={styles.header2}>{}</Text>
              <Text style={styles.header2}>{}</Text>
                <Text style={styles.header}>     Place of Supply: {invoice.state}</Text>
                <Text style={styles.header}>        {invoice.address1} {invoice.address2}</Text>
                <Text style={styles.header}>                           {invoice.district}</Text>
                <Text style={styles.header}>                Date:      {invoice.Date}</Text>
              </View>
            </View>
            {/* First Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Item Name</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>HSN/SAC</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Quantity</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Unit</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Price/Unit</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>GST</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Amount</Text>
                </View>
              </View>

              {/* Table Rows */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{product.PName}</Text>
                  ))}
                </View>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{product.HSN}</Text>
                  ))}
                </View>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{product.quantity}</Text>
                  ))}
                </View>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{product.unit}</Text>
                  ))}
                </View>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{product.price}</Text>
                  ))}
                </View>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{Number(product.SGST) + Number(product.CGST)}</Text>
                  ))}
                </View>
                <View style={styles.tableCell}>
                  {invoice.products.map((product) => (
                    <Text key={product._id}>{product.totalPrice}</Text>
                  ))}
                </View>
              </View>


              {/* 2 rd */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>

                  <Text>Delivery</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{invoice.Delivery}</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>0.00(0.0%)</Text>

                </View>

                <View style={styles.tableCell}>

                  <Text>{invoice.Delivery}</Text>

                </View>
              </View>


              {/* 3 rd */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>

                  <Text>Total</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{ }</Text>

                </View>
                <View style={styles.tableCell}>

                  <Text>{Number(invoice.Tcgst1) + Number(invoice.Tsgst1)}</Text>

                </View>

                <View style={styles.tableCell}>

                  <Text>{invoice.Subtotal}</Text>

                </View>
              </View>

            </View>

            {/* Second and Third Table */}
            <View style={styles.tableContainer}>
              {/* Second Table */}
              <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>Tax Type</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>Taxable Amount</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>Rate</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>Tax Amount</Text>
                  </View>
                </View>

                {/* Table Rows */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>

                    <Text>SGST</Text>

                  </View>
                  <View style={styles.tableCell}>
                    <Text>{invoice.Ttaxableamount}</Text>
                  </View>
                  <View style={styles.tableCell}>
                  <Text>2.5</Text>
                  </View>
                  <View style={styles.tableCell}>

                    <Text>{invoice.Tsgst1}</Text>

                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>

                    <Text>CGST</Text>

                  </View>
                  <View style={styles.tableCell}>
                    <Text>{invoice.Ttaxableamount}</Text>
                  </View>
                  <View style={styles.tableCell}>
                  <Text>2.5</Text>
                  </View>
                  <View style={styles.tableCell}>

                    <Text>{invoice.Tcgst1}</Text>

                  </View>
                </View>
              </View>

              {/* Third Table */}
              <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.tableHeader]}>

                  </View>
                  <View style={[styles.tableCell, styles.tableHeader]}>
                    <Text>Amounts</Text>
                  </View>
                </View>

                {/* Table Rows */}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>Sub Total</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{invoice.Subtotal}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>Total</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{invoice.Subtotal}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/*Terms and condition*/}
            <View style={styles.table2}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Estimate Amount in Words</Text>
                </View>

              </View>

              {/* Table Rows */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{numberToWords.toWords(parseInt(invoice.Subtotal, 10))} only</Text>
                </View>

              </View>
            </View>


            {/*Payment details*/}
            <View style={styles.table2}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Payment details</Text>
                </View>

              </View>

              {/* Table Rows */}
              <View style={styles.tableRow}>
  <View style={styles.customerDetailsColumn}>
    {payments.map((payment) => ( // Fix the variable name to 'payment' (lowercase 'p')
      <React.Fragment key={payment.id}> {/* Provide a unique key */}  
      <Text style={styles.header2}> {}</Text>    
        <Text style={styles.header2}>Bank Name: {payment.BName}</Text>
        <Text style={styles.header}>Bank Account No:{payment.AccountNo}</Text>
        <Text style={styles.header}>Bank IFSC Code: {payment.IFSC}</Text>
        <Text style={styles.header}>Account Holder's Name: {payment.HolderName}</Text>
      </React.Fragment>
    ))}
  </View>
</View>

          </View>




        </View>
      </View>
    </Page>
    </Document >
  );
};

export default PDFInvoice;

