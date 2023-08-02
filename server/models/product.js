const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  HSN: String,
  PName: String,
  price: Number,
  unit: String,
  quantity: String,
  sgst:Number,
  cgst:Number
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;