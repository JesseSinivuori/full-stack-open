import Header from "./Header";
import { type Course } from "../App";
import Total from "./Total";
import Content from "./Content";

export default function Course({ course }: { course: Course }) {
  return (
    <div>
      <Header text={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}
