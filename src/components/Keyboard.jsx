import React from "react";
import styled from "styled-components";
import { keyboardLayout } from "../assets/ui/keyboardLayout";
import Key from "./Key";

const Keyboard = () => {
  return (
    <KeyboardContainer>
      {/* ROW 1 */}
      {keyboardLayout.row1.map((key) => (
        <Key key={key} value={key} />
      ))}

      {/* ROW 2 */}
      <div className="space"></div>
      {keyboardLayout.row2.map((key) => (
        <Key key={key} value={key} />
      ))}
      <div className="space"></div>

      {/* ROW 3 */}
      {keyboardLayout.row3.map((key) => (
        <Key key={key} value={key} />
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
