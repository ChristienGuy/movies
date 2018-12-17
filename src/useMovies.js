import { useState, useEffect } from "react";
import { firestore } from "./firebaseConfig";

function useMovies(userId) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(userId)
      .collection('movies')
      .get()
      .then(doc => {
        console.log(doc);

        const data = doc.data();
        setMovies(data.movies);
      });
  }, []);

  function markAsWatched(movie) {
    // TODO: update remote data as well
    const { id } = movie;
    const newMovies = movies.map(
      movie => (movie.id === id ? { ...movie, watched: !movie.watched } : movie)
    );

    setMovies(newMovies);
  }

  return [movies, markAsWatched];
}

export default useMovies;
