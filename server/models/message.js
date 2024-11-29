const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  msgText: { type: String, required: true },
  sender: { type: String, required: true, unique: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;