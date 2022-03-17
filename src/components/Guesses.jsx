import { useRef } from "react";
import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Alerts from "./Alerts";
import Tile from "./Tile";
import useBoardSize from "../utils/useBoardSize";

const Guesses = () => {
  const [state, dispatch] = useWord();
  const boardContainerRef = useRef(null);
  const { boardHeight, boardWidth } = useBoardSize(boardContainerRef);

  return (
    <GuessContainer ref={boardContainerRef}>
      <GuessGrid
        style={{ height: `${boardHeight}px`, width: `${boardWidth}px` }}
      >
        {state.alerts.length !== 0 ? (
          <Alerts alertsList={state.alerts} />
        ) : null}
        {state.tiles.map(
          ({ id, value, status, shake, flip, bounce }, index) => (
            <Tile
              key={id}
              id={id}
              value={value}
              status={status}
              shake={shake}
              flip={flip}
              index={index}
              bounce={bounce}
              tileSize={boardWidth && (boardWidth - 45) / 6}
            />
          )
        )}
      </GuessGrid>
    </GuessContainer>
  );
};

export default Guesses;

const GuessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const GuessGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 5px;
  padding: 10px;
`;
