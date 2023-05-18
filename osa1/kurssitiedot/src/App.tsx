type Part = {
  name: string;
  exercises: number;
};

type Course = {
  name: string;
  parts: Part[];
};

const Header = (props: { course: Course }) => <h1>{props.course.name}</h1>;

const Part = (props: { part: Part }) => {
  const { name, exercises } = props.part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = (props: { course: Course }) => {
  const { parts } = props.course;
  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  );
};

const Total = (props: { course: Course }) => {
  const { parts } = props.course;
  let sumOfExercices = 0;
  parts.forEach((part) => {
    sumOfExercices += part.exercises;
  });
  return <p>Number of exercises {sumOfExercices}</p>;
};

const App = () => {
  const course: Course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default App;
