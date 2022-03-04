import React from "react";
import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Tile from "./Tile";

const Guesses = () => {
  const [state, dispatch] = useWord();

  return (
    <GuessGrid>
      {state.tiles.map(({ id, value, status }) => (
        <Tile key={id} value={value} status={status} />
      ))}
    </GuessGrid>
  );
};

export default Guesses;

const GuessGrid = styled.section`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 65px);
  grid-template-rows: repeat(6, 65px);
  gap: 5px;
  padding: 10px;
`;
