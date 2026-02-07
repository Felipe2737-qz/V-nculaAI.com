const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  provider: { type: String, enum: ['email', 'google', 'apple'], default: 'email' },
  vinculos: { type: Number, default: 5 }, // Start with 5 free
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'USD' },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
