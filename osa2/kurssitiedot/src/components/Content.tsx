import { type Course } from "../App";
import Part from "./Part";

const Content = ({ course }: { course: Course }) => {
  const { parts } = course;
  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  );
};

export default Content;
