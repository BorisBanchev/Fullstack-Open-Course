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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
