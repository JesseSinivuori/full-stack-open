const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3 && username.length < 3) {
    return res.status(400).json({
      error: "Name and password needs to be at least 3 characters long.",
    });
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password needs to be at least 3 characters long." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  await user.save();
  res.status(201).json(user);
});

usersRouter.put("/:id", async (req, res) => {
  const { username, name, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const updatedUser = {
    username,
    name,
    passwordHash,
  };

  const options = {
    new: true,
    runValidators: true,
    context: "query",
  };

  await User.findByIdAndUpdate(req.params.id, updatedUser, options);
  res.json(updatedUser);
});

usersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = usersRouter;
