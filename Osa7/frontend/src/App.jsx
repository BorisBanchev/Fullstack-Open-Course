import { useState, useEffect, createRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationMessage } from "./reducers/notificationReducer";
import { setBlogs, createBlog } from "./reducers/blogsReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = createRef();

  const notify = (message, type = "success") => {
    dispatch(setNotificationMessage(message, type));
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
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

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    //setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      //setBlogs(blogs.filter((b) => b.id !== blog.id));
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
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
