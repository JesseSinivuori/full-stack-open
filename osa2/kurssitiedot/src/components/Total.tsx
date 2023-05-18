import { Course } from "../App";

const Total = (props: { course: Course }) => {
  const { parts } = props.course;
  let sumOfExercices = 0;
  parts.forEach((part) => {
    sumOfExercices += part.exercises;
  });
  return <p>Number of exercises {sumOfExercices}</p>;
};

export default Total;
