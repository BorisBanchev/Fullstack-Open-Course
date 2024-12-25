import Blog from "./Blog";
import Notification from "./Notification";
const ShowBlogs = ({
  blogs,
  user,
  handleLogout,
  successMessage,
  errorMessage,
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
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default ShowBlogs;
