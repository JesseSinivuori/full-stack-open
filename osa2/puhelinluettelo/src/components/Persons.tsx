import { type TypePerson } from "../App";
import Person from "./Person";

const Persons = ({ filteredPersons }: { filteredPersons: TypePerson[] }) => (
  <>
    {filteredPersons.map((person) => (
      <Person person={person} key={person.name} />
    ))}
  </>
);

export default Persons;
