import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { clearNotification } = notificationSlice.actions;

export const setNotificationMessage = (message, time) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message));
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
