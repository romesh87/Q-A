const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  const secret = config.get('jwtSecret');
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Bad token' });
    }

    req.userId = decoded.user;
  });
  next();
};

module.exports = auth;
