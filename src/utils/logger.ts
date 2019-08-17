import winston, { LoggerOptions, transports, format } from "winston";

const options: LoggerOptions = {
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
