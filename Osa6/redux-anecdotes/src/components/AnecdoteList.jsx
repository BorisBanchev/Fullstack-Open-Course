import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    let filteredAnecdotes = state.anecdotes;
    if (state.filter !== "NO_FILTER") {
      filteredAnecdotes = filteredAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
    return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);
  });
  const voteAnecdote = (id) => {
    dispatch(vote(id));
    dispatch(
      setNotification(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`
      )
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
