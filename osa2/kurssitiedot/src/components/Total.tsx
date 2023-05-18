import { Course } from "../App";

const Total = ({ course }: { course: Course }) => {
  const { parts } = course;
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return <b>Total of {totalExercises} exercises</b>;
};

export default Total;
