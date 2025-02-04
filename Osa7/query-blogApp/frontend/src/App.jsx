import { useEffect, createRef, useContext } from "react";
import NotificationContext from "./contexts/NotificationContext";
import {
  setNotificationMessage,
  clearNotificationMessage,
} from "./contexts/NotificationContext";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogsReducer";

import { setUser, clearUser } from "./reducers/userReducer";
const App = () => {
  const dispatch = useDispatch();
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
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      storage.saveUser(user);
      notificationDispatch(
        setNotificationMessage(`Welcome back, ${user.name}`)
      );
    } catch (error) {
      notificationDispatch(
        setNotificationMessage("Wrong credentials", "error")
      );
      setTimeout(() => {
        notificationDispatch(clearNotificationMessage());
      }, 5000);
    }
  };

  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlog(newBlog));
    notificationDispatch(
      setNotificationMessage(
        `Blog created: ${newBlog.title}, ${newBlog.author}`
      )
    );
    setTimeout(() => {
      notificationDispatch(clearNotificationMessage());
    }, 5000);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    updatedBlog.user = blog.user;
    dispatch(likeBlog(updatedBlog));
    notificationDispatch(
      setNotificationMessage(
        `You liked ${updatedBlog.title} by ${updatedBlog.author}`
      )
    );
    setTimeout(() => {
      notificationDispatch(clearNotificationMessage());
    }, 5000);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    storage.removeUser();
    notificationDispatch(setNotificationMessage(`Bye, ${user.name}!`));
    setTimeout(() => {
      notificationDispatch(clearNotificationMessage());
    }, 5000);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog));
      notificationDispatch(
        setNotificationMessage(`Blog ${blog.title}, by ${blog.author} removed`)
      );
      setTimeout(() => {
        notificationDispatch(clearNotificationMessage());
      }, 5000);
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
