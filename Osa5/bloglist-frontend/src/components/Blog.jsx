import { useState } from "react";

const Blog = ({ blog }) => {
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
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
