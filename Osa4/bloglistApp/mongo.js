const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://borisbanchev03:${password}@project1.ms8h1.mongodb.net/blogApp?retryWrites=true&w=majority&appName=project1`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

if (process.argv.length === 3) {
  Blog.find({}).then((result) => {
    console.log("Blogs:");
    result.forEach((blog) => {
      console.log(`${blog.title}, ${blog.author}, ${blog.url}, ${blog.likes}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 7) {
  const title = process.argv[3];
  const author = process.argv[4];
  const url = process.argv[5];
  const likes = process.argv[6];
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });

  blog.save().then(() => {
    console.log(`added ${title}, ${author}, ${url}, ${likes} to bloglist`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid arguments");
  mongoose.connection.close();
}
