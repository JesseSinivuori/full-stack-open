const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);
const { initialBlogs, blogsInDb } = require("./test_helper");
const bcrypt = require("bcrypt");

let token = null;
beforeEach(async () => {
  token = null;
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("author", 10);
  const user = new User({
    username: "Author",
    name: "Author",
    passwordHash,
  });
  await user.save();
  await api
    .post("/api/login")
    .send({ username: "Author", name: "Author", password: "author" });
  const blogs = initialBlogs.map((blog) => ({ ...blog, user: user.id }));
  await Blog.insertMany(blogs);

  //create a blog for user "User", then login with user "Author"
  const passwordHash2 = await bcrypt.hash("user", 10);
  const user2 = new User({
    username: "User",
    name: "User",
    passwordHash2,
  });
  await user2.save();
  await api
    .post("/api/login")
    .send({ username: "User", name: "User", password: "user" });
  const blog = {
    title: "This is",
    author: "Author",
    url: "Updated",
    likes: 7,
    user: user2.id,
  };
  await Blog.create(blog);
});

describe("when theres initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const blogs = await blogsInDb();
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(blogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const res = await api.get("/api/blogs");

    const titles = res.body.map((r) => r.title);
    expect(titles).toContain("Title");
  });
});

describe("addition of a new blog", () => {
  beforeEach(async () => {
    const login = await api
      .post("/api/login")
      .send({ username: "Author", name: "Author", password: "author" });
    token = login.body.token;
  });
  test("a valid blog can be added", async () => {
    const blogsAtStart = await blogsInDb();
    const newBlog = {
      title: "New Title",
      author: "Author",
      url: "url",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toHaveLength(blogsAtStart.length + 1);
    expect(titles).toContain("New Title");
  });

  test("fails with status code 401 if theres no token", async () => {
    token = null;
    const blogsAtStart = await blogsInDb();
    const newBlog = {
      title: "New Title",
      author: "Author",
      url: "url",
      likes: 0,
    };

    const res = await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
    expect(res.body.error).toContain("no token");
  });

  test("fails with status code 400 if theres no title", async () => {
    const blogsAtStart = await blogsInDb();
    const newBlogwithoutTitle = {
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlogwithoutTitle)
      .expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("fails with status code 400 if theres no url", async () => {
    const blogsAtStart = await blogsInDb();
    const newBlogwithoutUrl = {
      title: "Title",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlogwithoutUrl)
      .expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("if likes is not set, it will be 0", async () => {
    const newBlog = {
      title: "New Title",
      author: "Author",
      url: "url",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog);
    const blogsAtEnd = await blogsInDb();
    const savedBlog = blogsAtEnd[blogsAtEnd.length - 1];

    expect(savedBlog.likes).toEqual(0);
  });
});

describe("blogs", () => {
  test("have an id property", async () => {
    const blogs = await blogsInDb();
    const blogsIds = blogs.map((blog) => blog.id);
    expect(blogsIds).toBeDefined();
  });
  test("have an user property", async () => {
    const blogs = await blogsInDb();
    const users = blogs.map((blog) => blog.user);
    expect(users).toBeDefined();
  });
});

describe("deletion of a blog", () => {
  beforeEach(async () => {
    const login = await api
      .post("/api/login")
      .send({ username: "Author", name: "Author", password: "author" });
    token = login.body.token;
  });
  test("succeeds with status code 204 if id is valid", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
  });
  test("fails with status code 400 if blog id is not valid", async () => {
    const NonValidId = "fakeid";
    const res = await api
      .delete(`/api/blogs/${NonValidId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(400);
    expect(res.body.error).toContain("malformatted id");
  });
  test("fails with status code 401 if the user is not the creator", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1];
    const res = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(401);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
    expect(res.body.error).toContain("unauthorized");
  });
  test("fails with status code 400 theres no token", async () => {
    token = null;
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const res = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(400);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
    expect(res.body.error).toContain("token missing or invalid");
  });
  test("fails with status code 401 theres a non valid token", async () => {
    token = "nonvalidtoken";
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const res = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(400);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length);
    expect(res.body.error).toContain("token missing or invalid");
  });
});

describe("updating a blog", () => {
  beforeEach(async () => {
    const login = await api
      .post("/api/login")
      .send({ username: "Author", name: "Author", password: "author" });
    token = login.body.token;
  });
  test("succeeds with status code 200 if blog is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "This is",
      author: "Author",
      url: "Updated",
      likes: 7,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    const updatedBlogAtEnd = blogsAtEnd[0];

    expect(updatedBlogAtEnd.title).toContain(updatedBlog.title);
  });
  test("fails with status code 401 if the user isnt the creator of the blog", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {
      title: "This is",
      author: "Not",
      url: "Updated",
      likes: 7,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtStart.length).toEqual(blogsAtEnd.length);
  });
  test("fails with status code 401 if theres a non valid token", async () => {
    token = "nonvalidtoken";
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "This is",
      author: "Author",
      url: "Updated",
      likes: 7,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtStart.length).toEqual(blogsAtEnd.length);
  });
  test("succees with status code 200 when only likes is updated", async () => {
    const blogsAtStart = await blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    const blogWithoutOnlyLikes = {
      likes: 58,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(blogWithoutOnlyLikes)
      .expect(200);

    const blogsAtEnd = await blogsInDb();
    const updatedBlogAtEnd = blogsAtEnd[0];

    expect(updatedBlogAtEnd.likes).toEqual(blogWithoutOnlyLikes.likes);
  });
  test("fails with status code 400 if blog id is not valid", async () => {
    const updatedBlog = {
      title: "This is",
      author: "Author",
      url: "Updated",
      likes: 7,
    };
    await api
      .put("/api/blogs/thisidisnotvalid")
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
