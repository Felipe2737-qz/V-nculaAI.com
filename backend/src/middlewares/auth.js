const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.accessToken;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // Try refresh token
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
      res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: 'lax', maxAge: 15 * 60 * 1000 });
      req.userId = decoded.userId;
      next();
    } catch {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
  }
};

module.exports = { authMiddleware };
