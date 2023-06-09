const logger = require("./logger");
const errorHandler = (error, req, res, next) => {
  const { message, name } = error;
  logger.error(message, name);
  if (name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (name === "ValidationError") {
    return res.status(400).json({ error: message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

module.exports = { errorHandler, unknownEndpoint };
