import React, { useState } from "react";
import styled from "styled-components";

import useMovies from "hooks/useMovies";
import { FilterMenu } from "./components/FilterMenu";
import { MoviesList } from "./components/MoviesList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  padding-top: 82px;
`;

const FilterWrapper = styled.div`
  z-index: 1;
  padding: 16px;

  display: flex;
  flex-direction: row;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;

  background: white;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.18);
`;

const MovieListSection = styled.div`
  height: 100%;
`;

const SearchInput = styled.input`
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 12px 16px;
  width: 100%;
  margin-right: 8px;
`;

const FilterMenuStyled = styled(FilterMenu)`
  margin-right: 8px;
`;

const Home = ({ user }) => {
  const [movies, markAsWatched] = useMovies(user.uid);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSortedMovies = movies
    .filter(movie => {
      if (filter === "unwatched") return !movie.watched;
      if (filter === "watched") return movie.watched;
      return true;
    })
    .filter(movie =>
      movie.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id);

  return (
    <Wrapper>
      <FilterWrapper>
        <SearchInput
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          type="text"
        />
        <FilterMenuStyled onFilter={filter => setFilter(filter)} />
      </FilterWrapper>
      <MovieListSection>
        <MoviesList movies={filteredSortedMovies} onChecked={markAsWatched} />
      </MovieListSection>
    </Wrapper>
  );
};

export default Home;
