import type { Total } from "../types";

const Total = (props: Total) => {
  return (
    <div>
      <p>Number of exercises {props.totalExercises}</p>
    </div>
  );
};

export default Total;
