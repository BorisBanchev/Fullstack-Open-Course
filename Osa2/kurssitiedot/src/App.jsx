const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({ course }) => {
  const parts = course.parts;
  return (
    <div>
      {" "}
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const parts = course.parts;
  const exercises = parts.map((part) => part.exercises);
  let total = 0;
  exercises.forEach((element) => {
    total += element;
  });
  return <div>total of {total} exercises</div>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };
  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
