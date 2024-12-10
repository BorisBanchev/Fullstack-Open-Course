import { useState, useEffect } from "react";
import noteService from "./services/persons";
const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <div>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </div>
      <br />
    </div>
  );
};

const Persons = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      {filteredPersons.map((person, i) => (
        <Person person={person} key={person.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const Filter = ({ filterText, handleFilterTextChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterText} onChange={handleFilterTextChange} />
    </div>
  );
};

const Personform = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          id="name"
          name="name"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          id="number"
          name="number"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.includes("removed") || message.includes("minimum")) {
    return <div className="error2"> {message} </div>;
  }
  return <div className="error"> {message} </div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  const names = persons.map((person) => person.name);

  const addPerson = (event) => {
    event.preventDefault();

    const existing = persons.find((person) => person.name === newName);
    if (existing) {
      const toReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (toReplace) {
        const updatedPerson = { ...existing, number: newNumber };
        noteService
          .replacePerson(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existing.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setErrorMessage(`Changed ${existing.name} phone number`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `${existing.name} was already removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        persons.filter((person) => person.id !== existing.id);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      noteService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setErrorMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleDelete = (id) => {
    const removedPerson = persons.find((person) => person.id === id);
    const toDelete = window.confirm(`Delete ${removedPerson.name}?`);
    if (toDelete) {
      noteService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setErrorMessage(`Deleted ${removedPerson.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />
      <h2>add a new</h2>
      <Personform
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filterText}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
