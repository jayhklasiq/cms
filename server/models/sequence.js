const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    maxDocumentId: { type: Number, default: 0 },
    maxMessageId: { type: Number, default: 0 },
    maxContactId: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
