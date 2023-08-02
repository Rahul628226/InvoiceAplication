const router = require('express').Router();
const Customer = require('../models/customer');
const Movie = require('../models/customer');


//add


router.post('/api/addcustomer', async (req, res) => {
    try {
      const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        district: req.body.district, 
        state: req.body.state,
        Country: req.body.Country,
        email: req.body.email,
        phone: req.body.phone,
        pin: req.body.pin,
        GstinNo: req.body.GstinNo,
      });
  
      const savedCustomer = await newCustomer.save();
      res.status(200).json('Customer Registered successfully');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//display

  router.get('/api/customerList', async (req, res) => {
    try {
      const Customerlist = await Customer.find({});
      res.status(200).json(Customerlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Delete

  router.delete('/api/deleteCustomer/:id',async(req,res)=>{
    try{
  
        //find the item by its id and deleted it
  
        const deleteCustomer= await Customer.findOneAndDelete(req.params.id);
        res.status(200).json('Deleted');
  
    }catch(err)
    {
        res.json(err);
    }
  })


  //Update

  router.put('/api/updateCustomer/:id',async(req,res)=>{
    try{
        //find the item by its id and update it
        const updateCustomer =await Customer.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json('Updated');
  
    }catch(err){
        res.json(err);
    }
  
  })
  
  

module.exports = router;
