const router = require('express').Router();
const Product = require('../models/product');



//Add Movies


router.post('/api/addProduct', async (req, res) => {
    try {
      const newProduct = new Product({
        HSN: req.body.HSN,
        PName: req.body.PName,
        price: req.body.price,
        unit: req.body.unit,
        quantity:req.body.quantity,
        sgst:req.body.sgst,
        cgst:req.body.cgst,
        
      });
  
      const savedProduct = await newProduct.save();
      res.status(200).json('Product added successfully');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//display

  router.get('/api/ProductList', async (req, res) => {
    try {
      const Productlist = await Product.find({});
      res.status(200).json(Productlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Delete

  router.delete('/api/deleteProduct/:id',async(req,res)=>{
    try{
  
        //find the item by its id and deleted it
  
        const deleteProduct= await Product.findOneAndDelete(req.params.id);
        res.status(200).json('Product deleted');
  
    }catch(err)
    {
        res.json(err);
    }
  })


  //Update

  router.put('/api/updateProduct/:id',async(req,res)=>{
    try{
        //find the item by its id and update it
        const updateItem =await Product.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json('Product Updated');
  
    }catch(err){
        res.json(err);
    }
  
  })
  
  

module.exports = router;
