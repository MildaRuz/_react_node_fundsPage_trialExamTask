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

const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  // patikrinti ar atejo APIError
  // if (errorGot instanceof APIError) {
  //   return res.status(errorGot.status).json({
  //     error: errorGot.message,
  //   });
  // }

  if (errorGot?.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      error: 'Email already taken',
    });
  }

  res.status(500).json({
    error: 'System errror',
  });
};

module.exports = {
  validateJWTToken,
  mainErrroHandler,
};
