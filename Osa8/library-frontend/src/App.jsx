import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { useApolloClient } from "@apollo/client";
const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  useEffect(() => {
    const token = localStorage.getItem("books-user-token");
    if (token) {
      setToken(token);
    }
  }, []);
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors show={page === "authors"} setError={notify} token={token} />

        <Books show={page === "books"} token={token} />

        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setError={notify}
        />
      </div>
    );
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} setError={notify} token={token} />

      <Books show={page === "books"} token={token} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
