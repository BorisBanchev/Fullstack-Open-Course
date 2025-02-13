import { GET_USER_DATA, ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendations = ({ show, token }) => {
  const { loading: userLoading, data: userData } = useQuery(GET_USER_DATA, {
    skip: !token,
  });

  const userFavoriteGenre = userData?.me?.favoriteGenre;

  const { loading: allBooksLoading, data: allBooksData } = useQuery(ALL_BOOKS, {
    skip: !userFavoriteGenre,
  });

  if (!show || !token) {
    return null;
  }

  if (userLoading || allBooksLoading) {
    return <div>loading...</div>;
  }

  const favoriteGenreBooks = allBooksData.allBooks.filter((book) =>
    book.genres.includes(userFavoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{userFavoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteGenreBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
