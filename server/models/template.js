const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    
    image: String
},
{
  timestamps: true,
}
);

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;