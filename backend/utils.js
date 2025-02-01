export function handler(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      console.log("Caught in handler");
      console.log("error", err);
      next(err);
    }
  };
}

export function errorHanlder(err, req, res, next) {
  console.log("Application Error");
  console.log("error message: ", err.message);
  console.log(err.stack);
  res.status(500).json({ message: "Internal Server Error", code: 500 });
}
