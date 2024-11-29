const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, default: null }, 
  phone: { type: String, default: null }, 
  imageUrl: { type: String, default: null }, 
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;