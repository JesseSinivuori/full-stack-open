const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const blog = await new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  });

  await blog.save();
  res.status(201).json(blog);
});

module.exports = blogsRouter;
