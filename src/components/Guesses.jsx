import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Alerts from "./Alerts";
import Tile from "./Tile";

const Guesses = () => {
  const [state, dispatch] = useWord();

  return (
    <Container>
      <GuessGrid>
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
    </Container>
  );
};

export default Guesses;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  @media (max-width: 400px) {
    padding: 5px;
  }
`;

const GuessGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 65px);
  grid-template-rows: repeat(6, 65px);
  gap: 5px;

  @media (max-width: 400px) {
    grid-template-columns: repeat(5, 60px);
    grid-template-rows: repeat(6, 60px);
  }
`;
