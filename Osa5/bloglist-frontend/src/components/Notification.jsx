const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  }
  return <div className="success">{successMessage}</div>;
};

export default Notification;
