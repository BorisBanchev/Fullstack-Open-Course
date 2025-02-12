import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATED_ANECDOTE":
      const createAnecdoteMessage = action.payload;
      return createAnecdoteMessage;

    case "VOTED_ANECDOTE":
      const votedAnecdoteMessage = action.payload;
      return votedAnecdoteMessage;

    case "ERROR":
      const errorMessage = action.payload;
      return errorMessage;

    case "CLEAR":
      return "";
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
