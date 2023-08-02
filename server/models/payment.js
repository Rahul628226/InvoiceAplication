const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  BName: String,
  AccountNo: String,
  IFSC: String,
  HolderName: String,
  
  image:String
},
{
  timestamps: true,
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;