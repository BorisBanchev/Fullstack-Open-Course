import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  setBlogs,
  blogs,
  setSuccessMessage,
  setErrorMessage,
  setBlogFormVisible,
  user,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      newBlog.user = user;
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogFormVisible(false);
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Invalid blog data");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title:"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="Author:"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="Url:"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </div>
  );
};
export default BlogForm;
