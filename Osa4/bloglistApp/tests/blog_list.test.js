const { test, describe } = require("node:test");
const assert = require("assert");
const listHelper = require("../utils/list_helper");
const totalLikes = listHelper.totalLikes;
const favoriteBlog = listHelper.favoriteBlog;

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(totalLikes([]), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const singleBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    assert.strictEqual(totalLikes(singleBlog), 5);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(totalLikes(blogs), 34);
  });
});

describe("favorite blog", () => {
  test("list with one returns that blog", () => {
    assert.strictEqual(favoriteBlog([(singleBlogList = blogs[0])]), blogs[0]);
  });

  test("list with multiple blogs returns the one with most likes", () => {
    assert.strictEqual(favoriteBlog(blogs), blogs[2]);
  });
});
