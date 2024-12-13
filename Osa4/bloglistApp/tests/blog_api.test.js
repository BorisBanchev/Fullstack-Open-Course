const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const describe = require("node:test").describe;
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Title 1",
    author: "Author 1",
    url: "URL1.com",
    likes: 1,
  },
  {
    title: "Title 2",
    author: "Author 2",
    url: "URL2.com",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blogs have id field instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

describe("adding a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Title 3",
      author: "Author 3",
      url: "URL3.com",
      likes: 3,
    };

    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    newBlog.id = postResponse.body.id;
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
    assert.deepStrictEqual(response.body[2], newBlog);
  });
});

after(async () => {
  await mongoose.connection.close();
});
