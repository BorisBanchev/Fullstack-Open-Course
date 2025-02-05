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
import { setUser, clearUser } from "./reducers/userReducer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const blogs = result.data || [];
  console.log(blogs);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, []);
  const user = useSelector((state) => state.user);

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
    newBlogMutation.mutate(blog);
    notificationDispatch(
      setNotificationMessage(`Blog created: ${blog.title}, ${blog.author}`)
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
