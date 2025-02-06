import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Link style={{ padding: "10px" }} to="/">
        blogs
      </Link>
      <Link style={{ padding: "10px" }} to="/users">
        users
      </Link>
      {user.name} logged in
      <span>
        {handleLogout && <button onClick={handleLogout}>logout</button>}
      </span>
    </div>
  );
};

export default Navbar;
