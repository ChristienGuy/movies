import React, { useState } from "react";
import { FilterMenu } from "./components/FilterMenu";
import { MoviesList } from "./components/MoviesList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

const MenuWrapper = styled.div`
  padding: 16px;
`;

const MovieListSection = styled.div`
  height: 100%;
`;

const Home = ({ moviesData = [] }) => {
  const [movies, setMovies] = useState(moviesData);
  const [filter, setFilter] = useState("all");

  const updateMovies = movie => {
    const { id } = movie;
    const newMovies = movies.map(
      movie => (movie.id === id ? { ...movie, watched: !movie.watched } : movie)
    );

    setMovies(newMovies);
  };

  const filteredSortedMovies = movies
    .filter(movie => {
      if (filter === "unwatched") return !movie.watched;
      if (filter === "watched") return movie.watched;
      return true;
    })
    .sort((a, b) => a.id - b.id);

  return (
    <Wrapper>
      <MenuWrapper>
        <FilterMenu onFilter={filter => setFilter(filter)} />
      </MenuWrapper>
      <MovieListSection>
        <MoviesList movies={filteredSortedMovies} onChecked={updateMovies} />
      </MovieListSection>
    </Wrapper>
  );
};

export default Home;
