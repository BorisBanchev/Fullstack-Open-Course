import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import { NotificationContextProvider } from "./contexts/NotificationContext";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
);
