const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const auth = (req, res, next) => {
  let token = null;
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.replace("bearer ", "");
  }

  if (!token) {
    return res.status(401).json({ error: "no token" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  req.userId = decodedToken.id.toString();
  next();
};

const authEdit = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }

  const user = await User.findById(req.userId);

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: "unauthorized" });
  }

  req.user = user.id.toString();
  next();
};

module.exports = { auth, authEdit };
