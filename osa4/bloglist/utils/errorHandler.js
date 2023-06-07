const errorHandler = (error, req, res, next) => {
  const { message, name } = error;
  console.log(message, name);
  if (name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (name === "ValidationError") {
    return res.status(400).json({ error: message });
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = { errorHandler, unknownEndpoint };
