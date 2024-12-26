import Blog from "./Blog";
import Notification from "./Notification";
import blogService from "../services/blogs";
import userService from "../services/users";
const ShowBlogs = ({
  blogs,
  setBlogs,
  user,
  handleLogout,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  blogForm,
}) => {
  if (!user) {
    return null;
  }

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      const user = await userService.getUserById(returnedBlog.user);
      returnedBlog.user = user;
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : returnedBlog
      );
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
      setSuccessMessage("Blog updated successfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Failed to update blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage && (
        <Notification errorMessage={errorMessage} successMessage={null} />
      )}
      {successMessage && (
        <Notification errorMessage={null} successMessage={successMessage} />
      )}
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      {blogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          user={user}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default ShowBlogs;
