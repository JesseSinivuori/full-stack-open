import { useEffect, useState } from "react";
import Input from "./components/Input";
import Header from "./components/Header";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

export type TypePerson = {
  name: string;
  number?: string;
  id?: number;
};

const App = () => {
  const [persons, setPersons] = useState<TypePerson[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPerson: TypePerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        if (existingPerson.id)
          personsService
            .update(existingPerson.id, newPerson)
            .then((newPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== existingPerson.id ? person : newPerson
                )
              );
            });
        notfication(`${newPerson.name} number changed`);
      }
    } else {
      personsService
        .create(newPerson)
        .then((newPerson) => setPersons(persons.concat(newPerson)));
      notfication(`Added ${newPerson.name}`);
    }

    setNewName("");
    setNewNumber("");
  };

  const notfication = (message: string) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 1500);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleDeletePerson = (person: TypePerson) => {
    const { id, name } = person;
    if (id) {
      if (window.confirm(`Delete ${name}?`)) {
        personsService.remove(id);
        setPersons(persons.filter((person) => person.id !== id));
        notfication(`${person.name} deleted`);
      }
    }
  };

  return (
    <div>
      <Header text={"Phonebook"} />
      <Notification message={notificationMessage} />
      <Input
        value={filter}
        handleChange={handleFilterChange}
        text={"filter shown with: "}
      />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Header text={"Numbers"} />
      <Persons
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
