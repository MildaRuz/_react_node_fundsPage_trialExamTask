const { jwtSecret } = require('./config');
const jwt = require('jsonwebtoken');

const validateJWTToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access denied' });

  if (!jwtSecret) return res.status(401).json({ error: 'JWT Secret not Provided' });

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    return next('Token Invalid', 401, error);
  }
};

module.exports = {
  validateJWTToken,
};
