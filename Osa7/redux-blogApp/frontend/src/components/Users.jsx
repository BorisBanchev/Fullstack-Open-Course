import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usersService from "../services/users";
import Notification from "./Notification";

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const Users = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  }, []);

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
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
