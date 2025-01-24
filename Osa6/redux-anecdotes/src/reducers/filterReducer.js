import { createSlice } from "@reduxjs/toolkit";

const initialFilter = "NO_FILTER";

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
