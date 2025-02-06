import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Notification from "./Notification";
const Blog = ({ handleVote, handleLogout }) => {
  const user = useSelector((state) => state.user);

  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }
  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  return (
    <div>
      <Notification />
      <h2>blog app</h2>
      <h2>{blog.title}</h2>
      <div>
        <a href="">{blog.url}</a>
      </div>
      {blog.likes} likes <button onClick={() => handleVote(blog)}>like</button>
      <div>added by {nameOfUser}</div>
      <h2>comments</h2>
      <div>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </div>
    </div>
  );
};

Blog.propTypes = {
  handleVote: PropTypes.func.isRequired,
};

export default Blog;
