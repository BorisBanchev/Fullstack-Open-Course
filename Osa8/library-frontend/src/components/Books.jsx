import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [sortBooksByGenre, setsortBookByGenre] = useState("all genres");

  const { loading: allBooksLoading, data: allBooksData } = useQuery(ALL_BOOKS, {
    skip: sortBooksByGenre !== "all genres",
  });

  const { loading: genreBooksLoading, data: genreBooksData } = useQuery(
    ALL_BOOKS_BY_GENRE,
    {
      variables: { genre: sortBooksByGenre },
      skip: sortBooksByGenre === "all genres",
    }
  );

  if (!props.show) {
    return null;
  }

  if (allBooksLoading || genreBooksLoading) {
    return <div>loading...</div>;
  }

  const books =
    sortBooksByGenre === "all genres"
      ? allBooksData.allBooks
      : genreBooksData.allBooks;

  const submit = (genre) => {
    setsortBookByGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>
      {sortBooksByGenre !== "all genres" && (
        <p>
          book in genre <b>{sortBooksByGenre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <div>
          <button onClick={() => submit("refactoring")}>refactoring</button>
          <button onClick={() => submit("agile")}>agile</button>
          <button onClick={() => submit("patterns")}>patterns</button>
          <button onClick={() => submit("design")}>design</button>
          <button onClick={() => submit("crime")}>crime</button>
          <button onClick={() => submit("classic")}>classic</button>
          <button onClick={() => submit("all genres")}>all genres</button>
        </div>
      )}
    </div>
  );
};

export default Books;
