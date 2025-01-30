import { useState, useEffect } from "react";
import noteService from "./services/notes";
import personService from "./services/persons";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl, token) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (baseUrl.includes("notes")) {
      noteService.setToken(token);
      noteService.getAll(baseUrl).then((initialNotes) => {
        setResources(initialNotes);
      });
    } else {
      personService.setToken(token);
      personService.getAll(baseUrl).then((initialPersons) => {
        setResources(initialPersons);
      });
    }
  }, []);

  const create = (resource) => {
    if (baseUrl.includes("notes")) {
      noteService.create(resource, baseUrl).then((returnedNote) => {
        setResources(resources.concat(returnedNote));
      });
    } else {
      personService.create(resource, baseUrl).then((returnedPerson) => {
        setResources(resources.concat(returnedPerson));
      });
    }
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const token = "my-token-is-this";
  const [notes, noteService] = useResource(
    "http://localhost:3005/notes",
    token
  );
  const [persons, personService] = useResource(
    "http://localhost:3005/persons",
    token
  );

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
