import { type TypePerson } from "../App";

const Person = ({ person }: { person: TypePerson }) => (
  <p>
    {person.name} {person.number}
  </p>
);

export default Person;
