// const router = require('express').Router();
// const Invoice = require('../models/Invoice')



// //add

// router.post('/api/addInvoice', async (req, res) => {
//     try {
//       const { firstName, products } = req.body;
  
//       const newInvoice = new Invoice({
//         firstName,
//         products,
//       });
  
//       const savedInvoice = await newInvoice.save();
//       res.status(200).json('Invoice created successfully');
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

// module.exports = router;


const router = require('express').Router();
const Invoice = require('../models/Invoice');
const pdf = require('html-pdf');
const fs = require('fs');

const puppeteer = require('puppeteer');

// Existing code...

// Generate and download PDF
router.get('/api/invoices/:id/pdf', async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);

    // Create an HTML template for the invoice content
    const htmlTemplate = `
      <h1>Invoice</h1>
      <h2>Customer Name: ${invoice.firstName}</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.products
            .map(
              (product) => `
            <tr>
              <td>${product.PName}</td>
              <td>${product.quantity}</td>
              <td>${product.price}</td>
              <td>${product.totalPrice}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <h3>Payment Details:</h3>
      <p>Company Name: Suraja Foods</p>
      <p>Address: Your Address Here</p>
      <p>Phone: Your Phone Number Here</p>
      <p>Email: Your Email Here</p>
      <p>Website: Your Website Here</p>
    `;

    // Generate PDF using puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlTemplate);
    const pdfBuffer = await page.pdf();

    // Close the puppeteer browser
    await browser.close();

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice_${invoice._id}.pdf"`);

    // Send the generated PDF to the client for download
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/api/addInvoice', async (req, res) => {
  try {
    const { firstName,lastName,address1,address2,shippingaddress1,shippingaddress2,shippingdistrict,shippingstate,shippingcountry,shippingpin,products,Delivery,Subtotal,Tsgst1,Tcgst1,district,state,country,Ttaxableamount,GSTIN,PhNo,Date } = req.body;

    const newInvoice = new Invoice({
      firstName,
      lastName,
      address1,
      address2,
      district,
      state,
      country,
      PhNo,
      GSTIN,
      Date,

      //shipping
      shippingaddress1,
      shippingaddress2,
      shippingdistrict,
      shippingstate,
      shippingcountry,
      shippingpin,

      Delivery,
      Subtotal,
      Tsgst1,
      Tcgst1,
      Ttaxableamount,
      //product
      products,
    });

    const savedInvoice = await newInvoice.save();
    res.status(200).json('Invoice created successfully');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//display

router.get('/api/invoices', async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //delete
  router.delete('/api/invoices/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Invoice.findByIdAndDelete(id);
      res.status(200).json('Invoice deleted successfully');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
