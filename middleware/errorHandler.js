const logEvents = require('./logEvents');

const errorHandler = (err, req, res, next) => {
  logEvents.logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\t${err.message}`);
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};

module.exports = errorHandler;