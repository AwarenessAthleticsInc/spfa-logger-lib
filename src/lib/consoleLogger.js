import { transports, format } from 'winston';
const { combine, timestamp, colorize, printf } = format;

/**
 * The Console logging transporter for winston logger
 */
export const consoleLogger = new transports.Console({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp, caller }) => 
      `${timestamp}(${caller}) [${level}]: ${message}`
    )
  )
});
