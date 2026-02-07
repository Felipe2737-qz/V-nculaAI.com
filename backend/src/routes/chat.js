const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

const AI_PY_URL = process.env.AI_PY_URL || 'http://127.0.0.1:8088';

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    if (!message?.trim()) {
      return res.status(422).json({ success: false, message: 'Message required' });
    }

    // ATOMIC vínculo consumption
    const result = await User.findOneAndUpdate(
      { _id: req.userId, vinculos: { $gt: 0 } },
      { $inc: { vinculos: -1 } },
      { new: true }
    );

    if (!result) {
      return res.status(403).json({ success: false, message: 'No vínculos remaining' });
    }

    // Call Python AI
    try {
      const aiRes = await fetch(`${AI_PY_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(10000),
      });

      const aiData = await aiRes.json();
      
      // Truncate to 500 chars
      const text = (aiData.answer || '').slice(0, 500);

      res.json({
        success: true,
        message: 'OK',
        data: {
          text,
          lang: aiData.lang || 'en',
          domain: aiData.domain,
          sources: aiData.sources || [],
          vinculosLeft: result.vinculos,
          conversationId: conversationId || 'new',
        },
      });
    } catch (aiErr) {
      // AI failed - refund vínculo
      await User.findByIdAndUpdate(req.userId, { $inc: { vinculos: 1 } });
      
      res.status(503).json({ success: false, message: 'AI service unavailable, vínculo refunded' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
