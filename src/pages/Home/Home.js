import React, { useState } from "react";
import styled from "styled-components";

import { FilterMenu } from "./components/FilterMenu";
import { MoviesList } from "./components/MoviesList";
import useMovies from "hooks/useMovies";

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

const SearchInput = styled.input`
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 16px;
`;

const Home = ({ user }) => {
  const [movies, markAsWatched] = useMovies(user.uid);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSortedMovies = movies
    .filter(movie => {
      if (filter === "unwatched") return !movie.watched;
      if (filter === "watched") return movie.watched;
      return true;
    })
    .filter(movie => movie.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.id - b.id);

  return (
    <Wrapper>
      <MenuWrapper>
        <FilterMenu onFilter={filter => setFilter(filter)} />
        <SearchInput value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text"/>
      </MenuWrapper>
      <MovieListSection>
        <MoviesList movies={filteredSortedMovies} onChecked={markAsWatched} />
      </MovieListSection>
    </Wrapper>
  );
};

export default Home;
