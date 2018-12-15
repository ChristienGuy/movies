import React, { useState } from "react";
import styled from "styled-components";

import { FilterMenu } from "./components/FilterMenu";
import { MoviesList } from "./components/MoviesList";
import { firestore } from "firebaseConfig";
import useMovies from "../../useMovies";

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

const Home = ({ user }) => {
  const [movies, markAsWatched] = useMovies(user.uid);
  const [filter, setFilter] = useState("all");



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
        <MoviesList movies={filteredSortedMovies} onChecked={markAsWatched} />
      </MovieListSection>
    </Wrapper>
  );
};

export default Home;
