import Course from "./components/Course";

export type Part = {
  id: number;
  name: string;
  exercises: number;
};

export type Course = {
  id: number;
  name: string;
  parts: Part[];
};

const App = () => {
  const course: Course = {
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

  return <Course course={course} />;
};

export default App;
