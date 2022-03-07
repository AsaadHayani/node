const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    // winston
    // new winston.transports.File({
    //   filename: "error.log",
    //   level: "error",
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.json(),
    //   ),
    // }),
    // winston-mongodb
    new winston.transports.MongoDB({
      level: "error",
      options: { useUnifiedTopology: true },
      db: "mongodb://localhost/mycompany",
    }),
    // new winston.transports.Console(),
  ],
});

module.exports = logger;
