import { useState } from "react";

const Person = ({ person }) => {
  return <div>{person.name}</div>;
};

const Persons = ({ persons }) => {
  const phones = persons;
  return (
    <div>
      {phones.map((person, name) => (
        <Person person={person} key={name} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const names = persons.map((person) => person.name);

  const addPerson = (event) => {
    event.preventDefault();

    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const personObject = {
      name: newName,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
