const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const { initialBlogs, blogsInDb } = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("when there's initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("React patterns");
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "New Title",
      author: "Author",
      url: "url",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("New Title");
  });

  test("fails with status code 400 if there's no title", async () => {
    const newBlogwithoutTitle = {
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api.post("/api/blogs").send(newBlogwithoutTitle).expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("fails with status code 400 if there's no url", async () => {
    const newBlogwithoutUrl = {
      title: "Title",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    await api.post("/api/blogs").send(newBlogwithoutUrl).expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("if likes is not set, it will be 0", async () => {
    const newBlog = {
      title: "New Title",
      author: "Author",
      url: "url",
    };
    await api.post("/api/blogs").send(newBlog);
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
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[blogs.length - 1];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });

  test("fails with status code 400 if id is not valid", async () => {
    const NonValidId = "fakeid";
    await api.delete(`/api/blogs/${NonValidId}`).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
