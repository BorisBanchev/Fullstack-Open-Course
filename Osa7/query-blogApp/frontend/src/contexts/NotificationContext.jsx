import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();
export const setNotificationMessage = (message, type = "success") => {
  return {
    type: "SET_NOTIFICATION",
    payload: { message: message, type: type },
  };
};
export const clearNotificationMessage = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
