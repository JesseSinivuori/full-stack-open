const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const auth = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.replace("bearer ", "");
  }

  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  req.token = decodedToken.id;
  next();
};

const authEdit = async (req, res, next) => {
  const user = await User.findById(req.token);
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).send({ error: "blog not found" });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).end();
  }

  req.user = user.id.toString();
  console.log(req.user);
  next();
};

module.exports = { auth, authEdit };
