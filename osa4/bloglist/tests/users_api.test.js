const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");
const { usersInDb, initialUsers, initialBlogs } = require("./test_helper");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash("user", 10);
  const user = new User({
    username: "User",
    name: "user",
    passwordHash,
  });

  await user.save();
});

describe("when there is initially one user at db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "User",
      name: "User",
      password: "user",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("creating a user", () => {
  test("fails with status code 400 if username is less than 3 characters long", async () => {
    const usersAtStart = await usersInDb();
    const user = {
      username: "ro",
      name: "Superuser",
      password: "password",
    };

    const res = await api.post("/api/users").send(user).expect(400);
    expect(res.body.error).toContain(
      "is shorter than the minimum allowed length (3)."
    );
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("fails with status code 400 if password is less than 3 characters long", async () => {
    const usersAtStart = await usersInDb();
    const user = {
      username: "user",
      name: "Superuser",
      password: "sa",
    };

    const res = await api.post("/api/users").send(user).expect(400);
    expect(res.body.error).toContain(
      "Password needs to be at least 3 characters long."
    );
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("fails with status code 400 if both, name and password are less than 3 characters long", async () => {
    const usersAtStart = await usersInDb();
    const user = {
      username: "ro",
      name: "Superuser",
      password: "sa",
    };

    const res = await api.post("/api/users").send(user).expect(400);
    expect(res.body.error).toContain(
      "Name and password needs to be at least 3 characters long."
    );
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("when theres initial users with blogs in the database", () => {
  beforeEach(async () => {
    const users = initialUsers.map((user) => {
      const blogs = initialBlogs
        .filter((blog) => blog.user === user.id)
        .map((blog) => blog.id);
      return { ...user, blogs: blogs };
    });
    await User.insertMany(users);
  });
  test("users have a blog property", async () => {
    const users = await usersInDb();
    const blogs = users.map((user) => user.blog);
    expect(blogs).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
