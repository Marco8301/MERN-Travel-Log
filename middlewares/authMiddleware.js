const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ msg: 'Token is needed' });
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  }
  next();
};

module.exports = authMiddleware;
