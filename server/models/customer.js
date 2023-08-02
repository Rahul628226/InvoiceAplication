const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  district:String, 
  state: String,
  Country: String,
  email: String,
  phone: String,
  pin: String,
  GstinNo: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;