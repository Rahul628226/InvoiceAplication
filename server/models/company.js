const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    
    Name: String,
    address1: String,
    address2: String,
    district:String, 
    state: String,
    Country: String,
    email: String,
    phone: String,
    pin: String,
    GstinNo: String,
    image: String
},
{
  timestamps: true,
}
);

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;