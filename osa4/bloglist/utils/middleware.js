const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = null;
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

  req.token = decodedToken.id;
  next();
};

module.exports = auth;
