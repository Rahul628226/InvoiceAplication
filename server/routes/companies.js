const router = require('express').Router();
const Company = require('../models/company');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


//add



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
  
  router.post('/api/addcompany', upload.single('image'), async (req, res) => {
    try {
      const image = req.file.filename;
      const newCompany = new Company({
        Name: req.body.Name,
        address1: req.body.address1,
        address2: req.body.address2,
        district: req.body.district, 
        state: req.body.state,
        Country: req.body.Country,
        email: req.body.email,
        phone: req.body.phone,
        pin: req.body.pin,
        GstinNo: req.body.GstinNo,
        image: image
      });
  
      const savedCompany = await newCompany.save();
      res.status(200).json(savedCompany);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




//display

router.get('/api/Companyslist', async (req, res) => {
    try {
      const Companys = await Company.find();
      const CompanysWithImageUrl = Companys.map((Company) => {
        return {
          ...Company._doc,
          image: `http://localhost:8080/Image/${Company.image}`
        };
      });
      res.status(200).json(CompanysWithImageUrl);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Delete

  router.delete('/api/deleteCompany/:id', async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      const imagePath = path.join('Image', company.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
      const deleteItem = await Company.findByIdAndDelete(req.params.id);
      res.status(200).json('Item deleted');
    } catch (err) {
      res.json(err);
    }
  });

  //Update

  
router.put('/api/updateCompany/:id', upload.single('image'), async (req, res) => {
    try {
      const updatedFields = {
        Name: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        district: req.body.district, 
        state: req.body.state,
        Country: req.body.Country,
        email: req.body.email,
        phone: req.body.phone,
        pin: req.body.pin,
        GstinNo: req.body.GstinNo,
      };
  
      if (req.file) {
        updatedFields.image = req.file.filename;
      }
  
      const updateItem = await Company.findByIdAndUpdate(req.params.id, { $set: updatedFields });
      res.status(200).json('updated');
    } catch (err) {
      res.json(err);
    }
  });
  
  

module.exports = router;