const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post("/", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  console.log(req.body);
  blog.save().then((savedBlog) => {
    res.status(201).json(savedBlog);
  });
});

module.exports = blogsRouter;
