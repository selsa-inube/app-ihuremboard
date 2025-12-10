type LogContext = Record<string, unknown>;

export class Logger {
  private static readonly isProduction = import.meta.env.PROD;

  private static formatMessage(
    level: string,
    message: string,
    context?: LogContext,
    error?: Error,
  ) {
    const timestamp = new Date().toISOString();

    return {
      timestamp,
      level,
      message,
      ...(context && { context }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      }),
    };
  }

  static info(message: string, context?: LogContext) {
    if (!this.isProduction) {
      console.log(this.formatMessage("INFO", message, context));
    }
  }

  static warn(message: string, context?: LogContext) {
    if (!this.isProduction) {
      console.warn(this.formatMessage("WARN", message, context));
    }
  }

  static debug(message: string, context?: LogContext) {
    if (!this.isProduction) {
      console.debug(this.formatMessage("DEBUG", message, context));
    }
  }

  static error(message: string, error?: Error, context?: LogContext) {
    console.error(this.formatMessage("ERROR", message, context, error));
  }
}
