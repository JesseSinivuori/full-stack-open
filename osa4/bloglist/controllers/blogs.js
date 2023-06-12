const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { auth, authEdit } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogsRouter.delete("/:id", auth, authEdit, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsRouter.post("/", auth, async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = await User.findById(req.userId);
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", auth, authEdit, async (req, res) => {
  const { title, author, url, likes } = req.body;

  const newBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };

  const options = {
    new: true,
    runValidators: true,
    context: "query",
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    newBlog,
    options
  );
  res.json(updatedBlog);
});

module.exports = blogsRouter;
