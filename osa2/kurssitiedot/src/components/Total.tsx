import { Course } from "../App";

const Total = ({ course }: { course: Course }) => {
  const { parts } = course;
  let sumOfExercices = 0;
  parts.forEach((part) => {
    sumOfExercices += part.exercises;
  });
  return <b>Total of {sumOfExercices} exercises</b>;
};

export default Total;
