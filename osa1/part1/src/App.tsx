type Part = {
  name: string;
  exercises: number;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const Header = (props: { course: string }) => <h1>{props.course}</h1>;

  const Part = (props: { part: Part }) => {
    const { name, exercises } = props.part;

    return (
      <p>
        {name} {exercises}
      </p>
    );
  };

  const Content = (props: { parts: Part[] }) => {
    const { parts } = props;

    return (
      <>
        {parts.map((part) => (
          <Part part={part} />
        ))}
      </>
    );
  };

  const Total = (props: { parts: Part[] }) => {
    const { parts } = props;
    return (
      <p>
        Number of exercises{" "}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    );
  };

  return (
    <>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </>
  );
};

export default App;
