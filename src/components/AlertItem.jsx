import { useState, useEffect } from "react";
import styled from "styled-components";
import { REMOVE_ALERT } from "../context/reducer";
import { useGame } from "../context/GameProvider";
import { useTheme } from "../context/ThemeProvider";

const AlertItem = ({ message }) => {
  const [state, dispatch] = useGame();
  const [darkTheme, setDarkTheme] = useTheme();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const opacityTimer = setTimeout(
      () => {
        if (state.win !== "lost") {
          setOpacity(0);
        }
      },
      state.win === "won" ? 2500 : 1000
    );

    return () => clearTimeout(opacityTimer);
  }, []);

  return (
    <AlertItemContainer
      onTransitionEnd={
        state.win === "lost" ? null : () => dispatch({ type: REMOVE_ALERT })
      }
      style={{ opacity: opacity }}
      darkTheme={darkTheme}
    >
      {message}
    </AlertItemContainer>
  );
};

export default AlertItem;

const AlertItemContainer = styled.div`
  pointer-events: none;
  background-color: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-alert-bg)"
      : "var(--light-mode-alert-bg)"};
  color: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-alert-text)"
      : "var(--light-mode-alert-text)"};
  padding: 16px;
  font-weight: bold;
  border-radius: 4px;
  margin-bottom: 12px;
  transition: opacity 0.5s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }
`;
