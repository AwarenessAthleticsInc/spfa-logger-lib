import { createLogger } from 'winston';
import { Logger } from './Logger.js';

// Mock all external imports:
jest.mock('winston', () => {
  const mCreateLogger = jest.fn();
  const mFormat = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
    colorize: jest.fn(),
    printf: jest.fn(),
  };

  return {
    createLogger: mCreateLogger,
    format: mFormat,
  };
});

jest.mock('@elastic/elasticsearch', () => {
  const mClient = jest.fn(() => ({}));
  return {
    Client: mClient,
  };
});

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('./lib/index.js', () => ({
  consoleLogger: {},
  esLogger: jest.fn(),
  fileTransporter: {},
}));

describe('Logger Class', () => {
  let mockLogFunction;
  let mockCreateLoggerImplementation;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the `log` function on Winston's logger instance
    mockLogFunction = jest.fn();

    // Mock createLogger to return an object with `log`
    mockCreateLoggerImplementation = jest.fn(() => ({
      log: mockLogFunction,
    }));

    // Make createLogger use our mock implementation
    createLogger.mockImplementation(mockCreateLoggerImplementation);
  });

  it('should log with "silly" level when trace is called', () => {
    const logger = new Logger('trace-caller');
    logger.trace('trace message');

    expect(mockLogFunction).toHaveBeenCalledTimes(1);
    expect(mockLogFunction).toHaveBeenCalledWith({
      level: 'silly',
      message: 'trace message',
      caller: 'trace-caller',
    });
  });

  it('should log with "info" level when info is called', () => {
    const logger = new Logger('info-caller');
    logger.info('info message');

    expect(mockLogFunction).toHaveBeenCalledTimes(1);
    expect(mockLogFunction).toHaveBeenCalledWith({
      level: 'info',
      message: 'info message',
      caller: 'info-caller',
    });
  });

  it('should log with "warn" level when warn is called', () => {
    const logger = new Logger('warn-caller');
    logger.warn('warning');

    expect(mockLogFunction).toHaveBeenCalledTimes(1);
    expect(mockLogFunction).toHaveBeenCalledWith({
      level: 'warn',
      message: 'warning',
      caller: 'warn-caller',
    });
  });

  it('should log with "error" level when error is called', () => {
    const logger = new Logger('error-caller');
    logger.error('error message');

    expect(mockLogFunction).toHaveBeenCalledTimes(1);
    expect(mockLogFunction).toHaveBeenCalledWith({
      level: 'error',
      message: 'error message',
      caller: 'error-caller',
    });
  });

  it('should log with "fatal" level when fatal is called', () => {
    const logger = new Logger('fatal-caller');
    logger.fatal('fatal error');

    expect(mockLogFunction).toHaveBeenCalledTimes(1);
    expect(mockLogFunction).toHaveBeenCalledWith({
      level: 'fatal',
      message: 'fatal error',
      caller: 'fatal-caller',
    });
  });
});
