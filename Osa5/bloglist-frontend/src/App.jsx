import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import ShowBlogs from "./components/ShowBlogs";
import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => {
    const hideBlogForm = { display: blogFormVisible ? "none" : "" };
    const showBlogForm = { display: blogFormVisible ? "" : "none" };

    return (
      <div>
        <div style={hideBlogForm}>
          <button onClick={() => setBlogFormVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showBlogForm}>
          <BlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            setBlogFormVisible={setBlogFormVisible}
            user={user}
          />
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  return (
    <div>
      {!user &&
        LoginForm({
          username,
          setUsername,
          password,
          setPassword,
          handleLogin,
          errorMessage,
        })}
      {user &&
        ShowBlogs({
          blogs,
          setBlogs,
          user,
          handleLogout,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          blogForm,
        })}
    </div>
  );
};

export default App;
