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

export class NotFoundError extends Error {
  code = StatusCodes.NOT_FOUND;

  constructor() {
    super("Not Found");
  }

  respond() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

export function errorHanlder(err, req, res, next) {
  console.log(`[ERROR]: ${err.message}`);
  console.log(err.stack);
  if (err instanceof NotFoundError) {
    return res.status(err.code).json(err.respond());
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error", code: 500 });
}
