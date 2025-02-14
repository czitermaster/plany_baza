import { StatusCodes } from "http-status-codes";
import * as OpenApiValidator from "express-openapi-validator";

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

  jsonResponse(res) {
    return res.status(this.code).json(this.respond());
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

export class ValidationError extends ApplicationError {
  code = StatusCodes.BAD_REQUEST;
  issues = [];

  constructor(validationError = []) {
    super("Bad Request");
    this.issues = validationError.errors.map((err) => ({
      value: err.path,
      issue: err.message,
    }));
  }

  respond() {
    return {
      message: this.message,
      issues: this.issues,
    };
  }
}

export function errorHanlder(err, req, res, next) {
  console.log(`[ERROR]: ${err.message}`);
  console.log(err.stack);
  if (err instanceof ApplicationError) {
    return err.jsonResponse(res);
  }
  if (err instanceof OpenApiValidator.error.BadRequest) {
    const validationError = new ValidationError(err);
    return validationError.jsonResponse(res);
  }
  if (err instanceof SyntaxError) {
    return new BadRequestError("Incorrect JSON body").jsonResponse(res);
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error", code: 500 });
}
