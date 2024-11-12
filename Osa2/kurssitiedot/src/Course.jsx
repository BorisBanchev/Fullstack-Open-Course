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
  console.log("What is happening here", exercises);
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  );
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

export default Course;
