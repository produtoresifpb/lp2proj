const jwt = require('jsonwebtoken')

function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const { userId, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    req.name = name
    next();
  } catch (error) {
    res.redirect('/auth/login');
  }
}

module.exports = { isAuthenticated };