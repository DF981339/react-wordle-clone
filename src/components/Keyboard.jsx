import { useEffect } from "react";
import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import Key from "./Key";
import { ADD_LETTER, DELETE_LETTER, GUESS_WORD } from "../context/reducer";

const Keyboard = () => {
  const [state, dispatch] = useWord();

  useEffect(() => {
    if (state.disableInteraction) {
      document.removeEventListener("keydown", handleKeyPress);
      return;
    }
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [state.disableInteraction]);

  const handleKeyPress = (e) => {
    if (e.ctrlKey || e.metaKey) return;

    if (e.key === "Enter") {
      dispatch({ type: GUESS_WORD });
      return;
    }

    if (e.key === "Backspace") {
      dispatch({ type: DELETE_LETTER });
      return;
    }

    if (e.key.match(/^[a-z]$/)) {
      dispatch({
        type: ADD_LETTER,
        payload: {
          letter: e.key,
        },
      });
      return;
    }
  };

  return (
    <KeyboardContainer>
      {state.keyboard.map(({ key, status }) => (
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
