import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Alerts from "./Alerts";
import Tile from "./Tile";
import useBoardSize from "../utils/useBoardSize";

const Guesses = ({ windowHeight }) => {
  const [state, dispatch] = useWord();
  const { boardHeight, boardWidth } = useBoardSize(windowHeight);

  return (
    <GuessContainer>
      <GuessGrid style={{ height: boardHeight, width: boardWidth }}>
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
  height: calc(100% - var(--header-height) - var(--keyboard-height));
  overflow: hidden;
`;

const GuessGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 5px;
  padding: 10px;
`;
