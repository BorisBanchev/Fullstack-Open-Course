const Blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (max.likes > blog.likes ? max : blog),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  let authorsWithBlogs = [];
  for (let blog of blogs) {
    let author = authorsWithBlogs.find((a) => a.author === blog.author);
    if (author) {
      author.blogs += 1;
    } else {
      authorsWithBlogs.push({ author: blog.author, blogs: 1 });
    }
  }
  return authorsWithBlogs.reduce(
    (max, author) => (max.blogs > author.blogs ? max : author),
    authorsWithBlogs[0]
  );
};

const mostLikes = (blogs) => {
  let authorsWithLikes = [];
  for (let blog of blogs) {
    let author = authorsWithLikes.find((a) => a.author === blog.author);
    if (author) {
      author.likes += blog.likes;
    } else {
      authorsWithLikes.push({ author: blog.author, likes: blog.likes });
    }
  }
  return authorsWithLikes.reduce(
    (max, author) => (max.likes > author.likes ? max : author),
    authorsWithLikes[0]
  );
};

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "author",
    url: "url",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  blogsInDb,
  nonExistingId,
};
