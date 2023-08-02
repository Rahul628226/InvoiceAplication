// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//     PName: String,
//     quantity: Number,
//     price: Number,
//     totalPrice: Number,
//   });

// const InvoiceSchema = new mongoose.Schema({
//   firstName: String, 
//   products: [ProductSchema],
// });

// const Invoice= mongoose.model('Invoice', InvoiceSchema);

// module.exports = Invoice;

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  PName: String,
  HSN:String,
  SGST:Number,
  CGST:Number,
  quantity: Number,
  price: Number,
  totalPrice: Number,
  discount:Number,
  taxableAmount:Number,
  taxType1:String,
  taxType2:String,

  GST:Number,
  Amount:Number,
  unit:String,

  sgst:Number,
  cgst:Number,
  



});

const InvoiceSchema = new mongoose.Schema({
  firstName: String,
  lastName:String,
  address1:String,
  address2:String,
  district:String,
  state:String,
  country:String,
  Tsgst1:Number,
  Tcgst1:Number,
  GSTIN:String,
  PhNo:Number,
  Date:String,



  //shipping
  shippingaddress1:String,
  shippingaddress2:String,
  shippingdistrict:String,
  shippingstate:String,
  shippingcountry:String,
  shippingpin:String,


  //products
  Subtotal:Number,
  Delivery:Number,
  Ttaxableamount:Number,
  products: [ProductSchema],
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
