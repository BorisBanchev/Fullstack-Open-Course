import Blog from "./Blog";
import Notification from "./Notification";
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
        />
      ))}
    </div>
  );
};

export default ShowBlogs;
