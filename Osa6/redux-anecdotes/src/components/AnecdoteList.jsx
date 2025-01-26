import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationMessage } from "../reducers/notificationReducer";

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
  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotificationMessage(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`,
        5
      )
    );
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
