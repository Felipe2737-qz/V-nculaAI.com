const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['pix', 'paypal', 'wise'], required: true },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'expired'], default: 'pending' },
  vinculosToAdd: { type: Number, required: true },
  idempotencyKey: { type: String, unique: true, sparse: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
