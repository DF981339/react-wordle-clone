import React from "react";
import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Key from "./Key";

const Keyboard = () => {
  const [state, dispatch] = useWord();

  return (
    <KeyboardContainer>
      {/* ROW 1 */}
      {state.keyboard.row1.map(({ key, status }) => (
        <Key key={key} value={key} status={status} />
      ))}

      {/* ROW 2 */}
      <div className="space"></div>
      {state.keyboard.row2.map(({ key, status }) => (
        <Key key={key} value={key} status={status} />
      ))}
      <div className="space"></div>

      {/* ROW 3 */}
      {state.keyboard.row3.map(({ key, status }) => (
        <Key key={key} value={key} status={status} />
      ))}
    </KeyboardContainer>
  );
};

export default Keyboard;

const KeyboardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(20, minmax(12px, 22.5px));
  grid-auto-rows: 60px;
  gap: 6px;
  justify-content: center;
`;
