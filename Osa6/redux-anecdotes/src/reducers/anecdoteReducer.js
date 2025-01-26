import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdoteId = action.payload;
      const anecdoteToChange = state.find((a) => a.id === anecdoteId);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== anecdoteId ? anecdote : changedAnecdote
      );
    },
    createAnecdote(state, action) {
      const content = action.payload;
      return state.concat({
        content: content,
        votes: 0,
      });
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export default anecdoteSlice.reducer;
