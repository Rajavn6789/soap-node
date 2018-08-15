const { addColors, createLogger, format, transports } = require('winston')
const { timestamp, colorize, splat, label, printf } = format;

const logger = createLogger({
  format: format.combine(
   colorize(),
   splat(),
   timestamp({
     format: 'YYYY-MM-DD HH:mm:ss'
   }),
   myFormat = printf((info) => {
     return `${info.timestamp} - ${info.level}: ${info.message}`;
   }),
 ),
  transports: [
     new transports.Console(),
     new transports.File({
       filename: 'log/info.log',
       level: 'info'
     }),
     new transports.File({
       filename: 'log/errors.log',
       level: 'error'
     })
   ],
    exitOnError: false,
});

module.exports = logger;
