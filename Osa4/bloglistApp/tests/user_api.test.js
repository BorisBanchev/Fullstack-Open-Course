const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const helper = require("../utils/list_helper");
const { url } = require("inspector");
const initialBlogs = require("../utils/list_helper").initialBlogs;
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "test_user1",
      name: "Test User 1",
      password: "test_password1",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
  test("creation fails with proper statuscode and message if username or password is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser1 = {
      username: "pa",
      name: "correct_name",
      password: "correct_password",
    };
    const newUser2 = {
      username: "correct_username",
      name: "correct_name2",
      password: "pa",
    };
    const result1 = await api
      .post("/api/users")
      .send(newUser1)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(
      result1.body.error.includes(
        "username and password must be at least 3 characters long"
      )
    );
    const result2 = await api
      .post("/api/users")
      .send(newUser2)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result2.body.error.includes(
        "username and password must be at least 3 characters long"
      )
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creating username without username or password fails with proper statuscode and message", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser1 = {
      username: "correct_username",
      name: "correct_name",
    };
    const newUser2 = {
      name: "correct_name2",
      password: "correct_password",
    };
    const result1 = await api
      .post("/api/users")
      .send(newUser1)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(result1.body.error.includes("username and password are required"));
    const result2 = await api
      .post("/api/users")
      .send(newUser2)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result2.body.error.includes("username and password are required"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
