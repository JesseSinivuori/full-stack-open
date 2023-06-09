const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const auth = require("../utils/middleware");

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

blogsRouter.delete("/:id", auth, async (req, res) => {
  const user = await User.findById(req.token);
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).send({ error: "Blog not found." });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).end();
  }

  await blog.deleteOne();
  res.status(204).end();
});

blogsRouter.post("/", auth, async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = await User.findById(req.token);
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

blogsRouter.put("/:id", async (req, res) => {
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
