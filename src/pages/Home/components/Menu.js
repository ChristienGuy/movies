import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  padding: 12px 16px;
  border: 1px solid #bebebe;
  background-color: transparent;
  border-radius: 4px;
`;

const Popup = styled.div`
  position: absolute;
  background: white;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;

  display: flex;
  flex-direction: column;

  padding: 16px;
  border: 1px solid #ebebeb;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.08);
`;

const ItemButton = styled.button`
  background-color: transparent;
  padding: 12px 16px;
  margin-bottom: 16px;

  &:last-of-type { 
    margin-bottom: 0;
  }
`;

const Menu = ({ buttonText, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {buttonText}
      </Button>
      {isOpen && (
        <Popup>
          {items.map(({ name, value }) => (
            <ItemButton onClick={() => onItemClick(value)}>{name}</ItemButton>
          ))}
        </Popup>
      )}
    </Wrapper>
  );
};

export { Menu };
