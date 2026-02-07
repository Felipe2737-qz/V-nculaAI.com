const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(422).json({ success: false, message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.json({ success: true, message: 'Registered', data: { user: { id: user._id, name: user.name, email: user.email, vinculos: user.vinculos, preferences: user.preferences } } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ success: false, message: err.errors[0].message });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.json({ success: true, message: 'Logged in', data: { user: { id: user._id, name: user.name, email: user.email, vinculos: user.vinculos, preferences: user.preferences } } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ success: false, message: err.errors[0].message });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out' });
});

// Me
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ success: false, message: 'Not found' });
  res.json({ success: true, message: 'OK', data: { user: { id: user._id, name: user.name, email: user.email, vinculos: user.vinculos, preferences: user.preferences } } });
});

// Forgot Password (simplified - just logs token)
router.post('/forgot-password', async (req, res) => {
  // In production, send email with reset link
  res.json({ success: true, message: 'If account exists, reset email sent' });
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  res.json({ success: true, message: 'Password reset' });
});

module.exports = router;
