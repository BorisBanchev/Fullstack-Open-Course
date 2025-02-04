import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
    default(state) {
      return state;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
