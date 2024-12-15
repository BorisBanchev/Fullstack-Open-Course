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
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("When there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    blogs = await helper.blogsInDb();
    assert.strictEqual(blogs.length, initialBlogs.length);
  });

  test("blogs have id field instead of _id", async () => {
    blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
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
    const blogs = await helper.blogsInDb();

    assert.strictEqual(blogs.length, initialBlogs.length + 1);
    assert.deepStrictEqual(blogs[2], newBlog);
  });

  test("adding a blog without likes defaults to 0", async () => {
    const newBlog = {
      title: "Title 3",
      author: "Author 3",
      url: "URL3.com",
    };
    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(postResponse.body.likes, 0);
  });
});

describe("adding invalid blog", () => {
  test("adding a blog wihtout title or url returns 400", async () => {
    const newBlog1 = {
      author: "Author 3",
      url: "URL3.com",
      likes: 3,
    };
    const newBlog2 = {
      title: "Title 3",
      author: "Author 3",
      likes: 3,
    };
    await api.post("/api/blogs").send(newBlog1).expect(400);

    await api.post("/api/blogs").send(newBlog2).expect(400);

    const blogs = await helper.blogsInDb();
    assert.strictEqual(blogs.length, initialBlogs.length);
  });
});

describe("deleting a blog", () => {
  test("deleting a blog with valid id returns 204", async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAfterDelete = await helper.blogsInDb();
    assert.strictEqual(blogsAfterDelete.length, blogs.length - 1);
    titles = blogsAfterDelete.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));
  });

  test("deleting a blog with invalid id returns 400", async () => {
    const nonExistingBlog = {
      id: "60f3b3b3b3b3b3b3b3b3b3b3",
      title: "Title 4",
      author: "Author 4",
      url: "URL4.com",
      likes: 4,
    };
    await api.delete(`/api/blogs/${nonExistingBlog.id}`).expect(400);
  });
});

describe("updating a blog", () => {
  test("updating a blog with a valid id returns 200", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const updatedBlog = {
      ...blogToUpdate,
      likes: 100,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
  });
  test("updating a blog with invalid id returns 400", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const updatedBlog = {
      ...blogToUpdate,
      id: "60f3b3b3b3b3b3b3b3b3b3b3",
      likes: 100,
    };
    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(400);
  });
  test("updating a blog with negative likes returns 400", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const updatedBlog = {
      ...blogToUpdate,
      likes: -100,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
