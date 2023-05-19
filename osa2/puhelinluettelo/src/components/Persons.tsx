import { type TypePerson } from "../App";
import Button from "./Button";
import Person from "./Person";

const Persons = ({
  filteredPersons,
  handleDeletePerson,
}: {
  filteredPersons: TypePerson[];
  handleDeletePerson: (person: TypePerson) => void;
}) => (
  <>
    {filteredPersons.map((person) => (
      <div key={person.name + person.number + person.id}>
        <Person person={person} />
        <Button
          text={"delete"}
          handleClick={() => handleDeletePerson(person)}
        />
      </div>
    ))}
  </>
);

export default Persons;
