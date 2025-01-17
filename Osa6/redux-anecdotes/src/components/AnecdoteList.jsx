import { useSelector, useDispatch } from "react-redux";
import { increaseVotesOf } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );

  const vote = (id) => {
    dispatch(increaseVotesOf(id));
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
