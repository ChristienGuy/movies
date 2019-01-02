import React, { useState, useEffect } from "react";
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
  position: fixed;
  background: white;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;

  display: flex;
  flex-direction: column;

  padding: 16px;
  padding-top: 48px;
  border: 1px solid #ebebeb;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.08);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const ItemButton = styled.button`
  background-color: transparent;
  padding: 16px 16px;
  margin-bottom: 16px;
  border: 1px solid #efefef;
  border-radius: 5px;

  font-size: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Menu = ({ buttonText, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = React.createRef();

  const closeMenuOnOutsideClick = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  });

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
        <Popup ref={wrapperRef}>
          <CloseButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </CloseButton>
          {items.map(({ name, value }) => (
            <ItemButton
              key={value}
              onClick={() => {
                onItemClick(value);
                setIsOpen(false);
              }}
            >
              {name}
            </ItemButton>
          ))}
        </Popup>
      )}
    </Wrapper>
  );
};

export { Menu };
