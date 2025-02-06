import { useSelector } from "react-redux";
import Notification from "./Notification";
import { Link, useParams } from "react-router-dom";

export const User = ({ handleLogout, users }) => {
  const loggedUser = useSelector((state) => state.user);
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }
  const blogs = user.blogs;
  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        {loggedUser.name} logged in
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          logout
        </button>
      </div>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const Users = ({ handleLogout, users }) => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        {user.name} logged in
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          logout
        </button>
      </div>

      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>User</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
