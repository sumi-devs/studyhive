const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    tags: [String],
    originalText: { type: String },
    summary: { type: String },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: 'notes_transaction'
});

module.exports = mongoose.model('Note', noteSchema);
