import { useEffect, createRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import { User } from "./components/Users";
import Users from "./components/Users";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationMessage } from "./reducers/notificationReducer";
import {
  setBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogsReducer";

import { setUser, clearUser } from "./reducers/userReducer";
import Navbar from "./components/Navbar";

const App = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, []);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = createRef();

  const notify = (message, type = "success") => {
    dispatch(setNotificationMessage(message, type));
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlog(newBlog));
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    console.log("updating", blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    updatedBlog.user = blog.user;
    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    dispatch(likeBlog(updatedBlog));
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;
  const sortedBlogs = [...blogs].sort(byLikes);
  return (
    <div className="container">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/users"
            element={<Users handleLogout={handleLogout} users={users} />}
          />
          <Route
            path="/users/:id"
            element={<User handleLogout={handleLogout} users={users} />}
          />
          <Route
            path="/"
            element={
              <div>
                <h2>blog app</h2>
                <Notification />
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <NewBlog doCreate={handleCreate} />
                </Togglable>
                {sortedBlogs.map((blog) => (
                  <div style={style} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </div>
                ))}
              </div>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog handleVote={handleVote} handleLogout={handleLogout} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
