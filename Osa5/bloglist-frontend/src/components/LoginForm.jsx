import Notification from "./Notification";

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
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;
