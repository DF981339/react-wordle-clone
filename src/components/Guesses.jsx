import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Alerts from "./Alerts";
import Tile from "./Tile";

const Guesses = () => {
  const [state, dispatch] = useWord();

  return (
    <GuessGrid>
      {state.alerts.length !== 0 ? <Alerts alertsList={state.alerts} /> : null}
      {state.tiles.map(({ id, value, status, shake, flip, bounce }, index) => (
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
