import { type Part } from "../App";

const Part = ({ part }: { part: Part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;
