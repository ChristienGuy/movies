import { useState, useEffect } from "react";
import { firestore } from "./firebaseConfig";

function useMovies(userId) {
  const userMoviesRef = firestore
    .collection("users")
    .doc(userId)
    .collection("movies");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // TODO: get user specific movies, merge together with all movies
    const moviesRef = firestore.collection("movies");
    // const userMoviesRef = firestore
    //   .collection("users")
    //   .doc(userId)
    //   .collection("movies");

    Promise.all([
      userMoviesRef.get().then(({ docs }) => {
        const userMovies = {};
        docs.forEach(movie => {
          const data = movie.data();
          userMovies[data.id] = data;
        });
        return userMovies;
      }),
      moviesRef.get().then(({ docs }) => {
        const movies = {};
        docs.forEach(movie => {
          const data = movie.data();
          movies[data.id] = movie.data();
        });

        return movies;
      })
    ]).then(([userMovies, allMovies]) => {
      const moviesObj = {
        ...allMovies,
        ...userMovies
      };

      setMovies(Object.values(moviesObj));
    });
  }, []);

  function markAsWatched(movie) {
    // TODO: update remote data as well
    const { id } = movie;
    const updatedMovie = { ...movie, watched: !movie.watched };

    const newMovies = movies.map(
      movie => (movie.id === id ? updatedMovie : movie)
    );

    userMoviesRef.doc(id.toString()).set(updatedMovie);

    setMovies(newMovies);
  }

  return [movies, markAsWatched];
}

export default useMovies;
