const IS_DEV = process.env.NODE_ENV !== "production";

function timestamp(): string {
  return new Date().toISOString();
}

function serialize(value: unknown): string {
  if (value instanceof Error) {
    return JSON.stringify({
      name: value.name,
      message: value.message,
      stack: IS_DEV ? value.stack : undefined,
      cause: value.cause ? serialize(value.cause) : undefined,
    });
  }
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value, (_key, v) =>
        typeof v === "bigint" ? v.toString() : v,
      );
    } catch {
      return String(value);
    }
  }
  return String(value);
}

type LogMeta = Record<string, unknown>;

type Level = "debug" | "info" | "warn" | "error";

function log(level: Level, context: string, message: string, meta?: LogMeta) {
  const entry = {
    level,
    context,
    message,
    timestamp: timestamp(),
    ...(meta ? { meta } : {}),
  };

  const line = `[${entry.timestamp}] [${context}]: ${message}`;
  const details = meta ? ` ${serialize(meta)}` : "";

  switch (level) {
    case "error":
      console.error(`${line}${details}`);
      break;
    case "warn":
      console.warn(`${line}${details}`);
      break;
    default:
      console.info(`${line}${details}`);
  }
}

export const logger = {
  debug(context: string, message: string, meta?: LogMeta) {
    if (IS_DEV) log("debug", context, message, meta);
  },
  info(context: string, message: string, meta?: LogMeta) {
    log("info", context, message, meta);
  },
  warn(context: string, message: string, meta?: LogMeta) {
    log("warn", context, message, meta);
  },
  error(context: string, message: string, meta?: LogMeta) {
    log("error", context, message, meta);
  },
  /**
   * Shorthand for logging a caught error with its stack trace.
   */
  exception(context: string, message: string, err: unknown) {
    const meta: LogMeta = {};
    if (err instanceof Error) {
      meta.errorName = err.name;
      meta.errorMessage = err.message;
      if (IS_DEV && err.stack) meta.stack = err.stack;
      if (err.cause) meta.cause = String(err.cause);
    } else {
      meta.errorValue = String(err);
    }
    log("error", context, message, meta);
  },
} as const;
