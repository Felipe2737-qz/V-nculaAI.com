const express = require('express');
const User = require('../models/User');
const Payment = require('../models/Payment');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

const PLANS = [
  { id: 'starter', name: 'Starter', vinculos: 50, prices: { USD: 1, BRL: 5, EUR: 0.99, GBP: 0.90 } },
  { id: 'basic', name: 'Basic', vinculos: 120, prices: { USD: 2, BRL: 10, EUR: 1.99, GBP: 1.80 } },
  { id: 'advanced', name: 'Advanced', vinculos: 250, prices: { USD: 4, BRL: 20, EUR: 3.99, GBP: 3.60 }, popular: true },
  { id: 'premium', name: 'Premium', vinculos: 1000, prices: { USD: 15, BRL: 75, EUR: 14.99, GBP: 13.99 } },
];

// Get plans
router.get('/plans', (req, res) => {
  res.json({ success: true, message: 'OK', data: { plans: PLANS } });
});

// Create payment
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { planId, method, currency, idempotencyKey } = req.body;
    
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) return res.status(422).json({ success: false, message: 'Invalid plan' });

    const payment = await Payment.create({
      userId: req.userId,
      planId,
      currency: currency || 'USD',
      amount: plan.prices[currency] || plan.prices.USD,
      method: method || 'pix',
      vinculosToAdd: plan.vinculos,
      idempotencyKey,
    });

    res.json({ success: true, message: 'Payment created', data: { paymentId: payment._id } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(422).json({ success: false, message: 'Duplicate payment' });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Confirm payment (idempotent)
router.post('/confirm', authMiddleware, async (req, res) => {
  try {
    const { paymentId } = req.body;
    
    const payment = await Payment.findOneAndUpdate(
      { _id: paymentId, userId: req.userId, status: 'pending' },
      { status: 'paid' },
      { new: true }
    );

    if (!payment) {
      // Check if already paid
      const existing = await Payment.findById(paymentId);
      if (existing?.status === 'paid') {
        return res.json({ success: true, message: 'Already confirmed' });
      }
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Credit vínculos
    await User.findByIdAndUpdate(req.userId, { $inc: { vinculos: payment.vinculosToAdd } });

    res.json({ success: true, message: 'Payment confirmed', data: { vinculosAdded: payment.vinculosToAdd } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
