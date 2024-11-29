const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;