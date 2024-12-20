const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (request.body.likes === undefined) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token" });
  }
  const user = await User.findById(decodedToken.id);
  const userid = user._id;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(400).json({ error: "Blog not found" });
  }

  if (!blog.user || blog.user.toString() !== userid.toString()) {
    return response
      .status(401)
      .json({ error: "Unauthorized to delete this blog" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  if (updatedBlog && updatedBlog.likes >= 0) {
    response.status(200).json(updatedBlog);
  } else {
    response.status(400).end();
  }
});

module.exports = blogsRouter;
