const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const logEvents = async (message) => {
  const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    await fsPromises.appendFile(path.join(__dirname, '../logEvents.txt'), logItem);
  } catch (err) {
    console.error(err);
}
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`);
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = { logEvents, logger };