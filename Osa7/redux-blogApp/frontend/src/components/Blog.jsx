import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Notification from "./Notification";
import blogService from "../services/blogs";
import { commentBlog } from "../reducers/blogsReducer";

const Blog = ({ handleVote }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }
  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = async (event) => {
    event.preventDefault();
    const commentToAdd = comment;
    const updatedBlog = await blogService.createComment(blog.id, commentToAdd);
    dispatch(commentBlog(updatedBlog));
    setComment("");
  };

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
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <button type="submit"> add comment </button>
        </div>
      </form>
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
