import type { Content } from "../types";
import type { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p>{props.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p>project exercises {props.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p>{props.description}</p>
          <p>submit to {props.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p>{props.description}</p>
          <p>required skills: {props.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(props);
  }
};

const Content = (props: Content) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
};

export default Content;
