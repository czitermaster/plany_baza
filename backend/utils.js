import { StatusCodes } from "http-status-codes";
export function handler(func) {
  return async (req, res, next) => {
    try {
      console.log(`[${req.method}]: ${req.originalUrl}`);
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

class ApplicationError extends Error {
  constructor(message) {
    super(message);
  }

  respond() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

export class NotFoundError extends ApplicationError {
  code = StatusCodes.NOT_FOUND;

  constructor(message) {
    super(message || "Not Found");
  }
}

export class BadRequestError extends ApplicationError {
  code = StatusCodes.BAD_REQUEST;

  constructor(message) {
    super(message || "Bad Request");
  }
}

export function errorHanlder(err, req, res, next) {
  console.log(`[ERROR]: ${err.message}`);
  console.log(err.stack);
  if (err instanceof ApplicationError) {
    return res.status(err.code).json(err.respond());
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error", code: 500 });
}
