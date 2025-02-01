import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
    default(state) {
      return state;
    },
  },
});

export const { clearNotification } = notificationSlice.actions;

export const setNotificationMessage = (message, type) => {
  return async (dispatch) => {
    dispatch(
      notificationSlice.actions.setNotification({
        message: message,
        type: type,
      })
    );
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
