import { useState } from "react";
import blogService from "../services/blogs";
import userService from "../services/users";

const Blog = ({
  blog,
  blogs,
  setBlogs,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [showAllData, setShowAllData] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setShowAllData(!showAllData);
  };

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      const user = await userService.getUserById(returnedBlog.user);
      returnedBlog.user = user;
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : returnedBlog
      );
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
      setSuccessMessage("Blog updated successfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Failed to update blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}{" "}
        <button onClick={toggleVisibility}>
          {showAllData ? "hide" : "view"}
        </button>
      </div>
      {showAllData && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button
              onClick={() =>
                handleUpdate(blog.id, {
                  ...blog,
                  likes: blog.likes + 1,
                  user: blog.user.id,
                })
              }
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
