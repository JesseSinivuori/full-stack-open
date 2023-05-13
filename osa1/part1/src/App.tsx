const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = (props: { course: string }) => <h1>{props.course}</h1>;

  const Content = (props: { part: string[]; exercises: number[] }) => (
    <>
      <p>
        {props.part[0]} {props.exercises[0]}
      </p>
      <p>
        {props.part[1]} {props.exercises[1]}
      </p>
      <p>
        {props.part[2]} {props.exercises[2]}
      </p>
    </>
  );

  const Total = (props: { exercises: number[] }) => (
    <p>
      Number of exercises{" "}
      {props.exercises[0] + props.exercises[1] + props.exercises[2]}
    </p>
  );

  return (
    <>
      <Header course={course} />
      <Content
        part={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </>
  );
};

export default App;
