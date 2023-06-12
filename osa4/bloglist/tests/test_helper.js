const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const initialUsers = [
  {
    username: "mluukkai",
    name: "Matti Luukkainen",
    blogs: [
      "6483981151ee2d643d08bec6",
      "6483981251ee2d643d08beca",
      "6483981251ee2d643d08bece",
    ],
    id: "64822318973c7147f952929e",
  },
  {
    username: "Author",
    name: "Author",
    blogs: [
      "64839145943fd3263a382643",
      "64839af65e798f32dffc26a0",
      "64839b025e798f32dffc26ab",
    ],
    id: "6482f6eb2cea78a4f7c3d469",
  },
  {
    username: "Test",
    name: "test",
    blogs: ["64837ab588ba9f1427935441"],
    id: "64837a9f88ba9f142793543b",
  },
];

const initialBlogs = [
  {
    title: "This",
    author: "Is",
    url: "Updated",
    likes: 1,
    user: "64837a9f88ba9f142793543b",
    id: "64837ab588ba9f1427935441",
  },
  {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 0,
    user: "6482f6eb2cea78a4f7c3d469",
    id: "64839145943fd3263a382643",
  },
  {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 0,
    user: "64822318973c7147f952929e",
    id: "6483981151ee2d643d08bec6",
  },
  {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 0,
    user: "64822318973c7147f952929e",
    id: "6483981251ee2d643d08beca",
  },
  {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 0,
    user: "64822318973c7147f952929e",
    id: "6483981251ee2d643d08bece",
  },
  {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 0,
    user: "6482f6eb2cea78a4f7c3d469",
    id: "64839af65e798f32dffc26a0",
  },
  {
    title: "Title",
    author: "Author",
    url: "url",
    likes: 0,
    user: "6482f6eb2cea78a4f7c3d469",
    id: "64839b025e798f32dffc26ab",
  },
];

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
};
