import { createSlice } from "@reduxjs/toolkit";

const initialSate = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState: initialSate,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      return [...state, action.payload];
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload;
      return state.filter((blog) => blog.id !== blogToRemove.id);
    },
  },
});

export const { setBlogs, createBlog, likeBlog, removeBlog } =
  blogsSlice.actions;

export default blogsSlice.reducer;
