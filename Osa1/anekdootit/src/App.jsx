import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const min = 0;
  const max = anecdotes.length - 1;
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const setMorePoints = (index) => {
    const copy = [...points];
    copy[index] += 1;
    setPoints(copy);
  };

  const setToSelected = () => {
    const newAnecdote = Math.floor(Math.random() * (max - min + 1)) + min;
    setSelected(newAnecdote);
  };

  const mostVotes = () => {
    const maxValue = Math.max(...points);
    const maxIndex = points.indexOf(maxValue);
    return (
      <div>
        {anecdotes[maxIndex]}
        <br />
        has {maxValue} votes
      </div>
    );
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button handleClick={() => setMorePoints(selected)} text="vote" />{" "}
      <Button handleClick={setToSelected} text="new anecdote" />
      <br />
      <h1>Anecdote with most votes</h1>
      {mostVotes()}
    </div>
  );
};

export default App;
