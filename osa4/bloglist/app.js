const express = require("express");
const config = require("./utils/config");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const blogsRouter = require("./controllers/blogs");
const { info, error } = require("./utils/logger");
const { errorHandler, unknownEndpoint } = require("./utils/errorHandler");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    error("error connection to MongoDB:", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    morgan.token("body", (req) => {
      return JSON.stringify(req.body);
    });
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);
app.use("/api/blogs", blogsRouter);
app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
