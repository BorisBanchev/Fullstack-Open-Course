import Notification from "./Notification";
import PropTypes from "prop-types";
const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  errorMessage,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      {errorMessage && (
        <Notification errorMessage={errorMessage} successMessage={null} />
      )}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
LoginForm.displayName = "LoginForm";

export default LoginForm;
