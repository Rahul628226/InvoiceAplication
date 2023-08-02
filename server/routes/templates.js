const router = require('express').Router();
const Template = require('../models/template');
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
  
  router.post('/api/addtemplate', upload.single('image'), async (req, res) => {
    try {
      const image = req.file.filename;
      const newtemplate = new Template({
        image: image
      });
  
      const savedtemplate = await newtemplate.save();
      res.status(200).json(savedtemplate);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




//display

router.get('/api/templatelist', async (req, res) => {
    try {
      const Templates = await Template.find();
      const templateWithImageUrl = Templates.map((Template) => {
        return {
          ...Template._doc,
          image: `http://localhost:8080/Image/${Template.image}`
        };
      });
      res.status(200).json(templateWithImageUrl);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  

  //Update

  
router.put('/api/updatetemplate/:id', upload.single('image'), async (req, res) => {
    try {
      const updatedFields = {

      };
  
      if (req.file) {
        updatedFields.image = req.file.filename;
      }
  
      const updateItem = await Template.findByIdAndUpdate(req.params.id, { $set: updatedFields });
      res.status(200).json('updated');
    } catch (err) {
      res.json(err);
    }
  });
  
  

module.exports = router;