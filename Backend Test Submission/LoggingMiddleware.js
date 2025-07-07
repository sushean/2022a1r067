const { Log } = require('../Logging Middleware/logMiddleware');

function logMiddleware(req, res, next) {
  const message = `${req.method} ${req.originalUrl}`;
  Log("backend", "info", "middleware", message).catch(() => {});
  next();
}

module.exports = logMiddleware;