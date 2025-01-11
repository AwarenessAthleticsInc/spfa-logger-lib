import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * The file transporter for the logs
 */
export const fileTransporter = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});
