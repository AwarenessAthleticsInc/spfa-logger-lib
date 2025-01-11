import { createLogger, format } from 'winston';
import { Client } from '@elastic/elasticsearch';
import { config } from "dotenv";
import { consoleLogger, esLogger, fileTransporter } from './lib/index.js';

const { combine, timestamp, json, colorize, printf } = format;
config();

const esClient = new Client({
  node: process.env.ES_URL,
  auth: {
    username: process.env.ES_USER,
    password: process.env.ES_PASS
  }
});
const pattern = process.env.ES_PATTERN

/**
 * SPFA Logger Class 
 * @param {String} caller - The name of the file that is invoking logger
 * Please ensure that you have needed ES_ params setup ahead of time within your project
 */
export class Logger {
  constructor(caller) {
    this.caller = caller;
    this.logger = createLogger({
      level: 'silly',
      format: combine(
        timestamp(),
        json()
      ),
      transports: [
        fileTransporter,
        consoleLogger,
        esLogger(esClient, pattern)
      ]
    });
  }

  log(level, message) {
    this.logger.log({
      level,
      message,
      caller: this.caller,
    });
  }

  trace(message) {
    this.log('silly', message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }

  fatal(message) {
    this.log('fatal', message);
  }
}
