import { useState } from "react";

export type Person = {
  name: string;
};

const Person = ({ person }: { person: Person }) => <p>{person.name}</p>;

const App = () => {
  const [persons, setPersons] = useState<Person[]>([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
    };

    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person person={person} key={person.name} />
      ))}
    </div>
  );
};

export default App;
