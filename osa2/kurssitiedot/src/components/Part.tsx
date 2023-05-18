import { type Part } from "../App";

const Part = (props: { part: Part }) => {
  const { name, exercises } = props.part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;
