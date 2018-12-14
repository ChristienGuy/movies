import React from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import styled from "styled-components";
import "react-virtualized/styles.css";
import { MovieItem } from "./MovieItem";

const ListStyled = styled(List)`
  padding-left: 16px;
  padding-right: 16px;
`;

const MoviesList = ({ movies, onChecked }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 60
  });

  const renderRow = ({ index, key, style, parent }) => {
    const movie = movies[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <MovieItem movie={movie} onChecked={onChecked} style={style} />
      </CellMeasurer>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <ListStyled
          height={height}
          width={width}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={renderRow}
          rowCount={movies.length}
          overscanRowCount={3}
        />
      )}
    </AutoSizer>
  );
};

export { MoviesList };
