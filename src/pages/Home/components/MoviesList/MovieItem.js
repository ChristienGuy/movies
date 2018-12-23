import React from "react";
import styled from "styled-components";

const Label = styled.label`
  padding: 16px 0;
`;

const HiddenInput = styled.input`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  visibility: hidden;
  opacity: 0;
`;

const Text = styled.span`
  position: relative;
  color: ${({ checked }) => checked ? '#d8d8d8' : '#333' };
`;

const MovieItem = ({ movie, onChecked, style }) => {
  const { text, watched } = movie;
  return (
    <Label style={style}>
      <HiddenInput
        onChange={() => onChecked(movie)}
        type="checkbox"
        checked={watched}
      />
      <Text checked={watched}>{text}</Text>
    </Label>
  );
};

export { MovieItem };
