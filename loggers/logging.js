const winston = require('winston')
winston.remove(winston.transports.Console)
require('express-async-errors')
let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all:true
    }),
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.timestamp({
        format:"YY-MM-DD HH:MM:SS"
    }),
    winston.format.printf(
        info => `  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(
            info => ` ${info.timestamp}  ${info.level} : ${info.message}`
        )),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log', level: 'info' }),

    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: alignColorsAndTime,
    }));
}

module.exports = logger