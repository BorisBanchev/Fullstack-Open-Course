import { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  );
};

const Statistics = (props) => {
  let average = 0;
  let positive = 0;
  if (props.total !== 0) {
    positive = (props.good / props.total) * 100;
    average =
      (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.total;
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + " %"} />
        </table>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <b>No feedback given</b>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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
  const [total, setTotal] = useState(0);

  const setToGood = () => {
    const goodUpdated = good + 1;
    setToTotal();
    setGood(goodUpdated);
  };
  const setToNeutral = () => {
    const neutralUpdated = neutral + 1;
    setToTotal();
    setNeutral(neutralUpdated);
  };

  const setToBad = () => {
    const badUpdated = bad + 1;
    setToTotal();
    setBad(badUpdated);
  };

  const setToTotal = () => {
    const totalUpdated = total + 1;
    setTotal(totalUpdated);
  };

  return (
    <div>
      <Header />
      <div>
        <Button handleClick={() => setToGood()} text="good" />
        <Button handleClick={() => setToNeutral()} text="neutral" />
        <Button handleClick={() => setToBad()} text="bad" />
        <br />
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      </div>
    </div>
  );
};

export default App;
