import type { Total } from "../types";

const Total = (props: Total) => {
  return (
    <div>
      <b>
        <p>Number of exercises {props.totalExercises}</p>
      </b>
    </div>
  );
};

export default Total;
