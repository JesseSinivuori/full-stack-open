import { type TypePerson } from "../App";

const Person = ({ person }: { person: TypePerson }) => (
  <div>
    {person.name} {person.number}
  </div>
);

export default Person;
