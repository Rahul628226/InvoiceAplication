const router = require('express').Router();
const Payment = require('../models/payment');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Image/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/api/addPayment', upload.single('image'), async (req, res) => {
    try {
      let image = '';
      if (req.file) {
        image = req.file.filename;
      }
      const newPayment = new Payment({
        BName: req.body.BName,
        AccountNo: req.body.AccountNo,
        IFSC: req.body.IFSC,
        HolderName: req.body.HolderName,
        image: image
      });
  
      const savedPayment = await newPayment.save();
      res.status(200).json(savedPayment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.get('/api/Paymentslist', async (req, res) => {
  try {
    const Payments = await Payment.find();
    const PaymentsWithImageUrl = Payments.map((Payment) => {
      return {
        ...Payment._doc,
        image: `http://localhost:8080/Image/${Payment.image}`,
      };
    });
    res.status(200).json(PaymentsWithImageUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/deletePayment/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const imagePath = path.join('Image', payment.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const deleteItem = await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json('Item deleted');
  } catch (err) {
    res.json(err);
  }
});

router.put('/api/updatePayment/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedFields = {
      BName: req.body.BName,
      AccountNo: req.body.AccountNo,
      IFSC: req.body.IFSC,
      HolderName: req.body.HolderName,
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updateItem = await Payment.findByIdAndUpdate(req.params.id, { $set: updatedFields });
    res.status(200).json('Updated');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
