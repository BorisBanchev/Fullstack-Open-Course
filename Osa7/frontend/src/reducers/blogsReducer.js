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
  },
});

export const { setBlogs, createBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
