import PropTypes from "prop-types";

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  }
  return <div className="success">{successMessage}</div>;
};

Notification.displayName = "Notification";
Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

export default Notification;
