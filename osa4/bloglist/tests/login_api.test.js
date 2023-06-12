const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("author", 10);
  const user = new User({
    username: "Author",
    name: "Author",
    passwordHash,
  });

  await user.save();
});

describe("logging in", () => {
  test("succeeds with status code 200 with valid user details", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "Author", name: "Author", password: "author" })
      .expect(200);

    expect(res.body.token).toBeDefined();
    expect(res.body.username).toEqual("Author");
    expect(res.body.name).toEqual("Author");
  });
  test("fails with status code 401 with non valid user details", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "non", name: "valid", password: "user" })
      .expect(401);
    expect(res.body.token).toEqual(undefined);
    expect(res.body.error).toContain("invalid username or password");
  });
  test("fails with status code 401 with non valid username", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "author", name: "Author", password: "author" })
      .expect(401);
    expect(res.body.token).toEqual(undefined);
    expect(res.body.error).toContain("invalid username or password");
  });
  test("fails with status code 401 with non valid password", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "Author", name: "Author", password: "Author" })
      .expect(401);
    expect(res.body.token).toEqual(undefined);
    expect(res.body.error).toContain("invalid username or password");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
