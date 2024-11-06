import { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {props.good}
        <br />
        neutral {props.neutral}
        <br />
        bad {props.bad}
      </p>
    </div>
  );
};

const Button = (props) => {
  const text = props.text;
  return <button onClick={props.handleClick}>{text}</button>;
};
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => {
    const goodUpdated = good + 1;
    setGood(goodUpdated);
  };
  const setToNeutral = () => {
    const neutralUpdated = neutral + 1;
    setNeutral(neutralUpdated);
  };

  const setToBad = () => {
    const badUpdated = bad + 1;
    setBad(badUpdated);
  };

  return (
    <div>
      <Header />
      <div>
        <Button handleClick={() => setToGood()} text="good" />
        <Button handleClick={() => setToNeutral()} text="neutral" />
        <Button handleClick={() => setToBad()} text="bad" />
        <br />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
