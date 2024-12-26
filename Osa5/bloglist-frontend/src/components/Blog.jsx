import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import userService from "../services/users";

const Blog = ({
  blog,
  blogs,
  setBlogs,
  setErrorMessage,
  setSuccessMessage,
  user,
  handleUpdate,
}) => {
  const [showAllData, setShowAllData] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    }
  });
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

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(updatedBlogs);
        setSuccessMessage("Blog deleted successfully");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (exception) {
        setErrorMessage("Failed to delete blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>
          {showAllData ? "hide" : "view"}
        </button>
      </div>
      {showAllData && (
        <div>
          <div>{blog.author}</div>
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
          {blog.user.name === userName && (
            <button className="deleteButton" onClick={handleDelete}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
