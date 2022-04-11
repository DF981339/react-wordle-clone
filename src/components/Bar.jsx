import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useGame } from "../context/GameProvider";

const Bar = ({ guess, freq, width }) => {
  const [darkTheme, setDarkTheme] = useTheme();
  const [gameState, gameDispatch] = useGame();

  return (
    <BarContainer
      darkTheme={darkTheme}
      winRow={gameState.winRow + 1 === guess}
      freq={freq}
    >
      <div className="guess">{guess}</div>

      <div className="graph">
        <div className="bar" style={{ width: `${width}%` }}>
          <div className="num-guesses">{freq}</div>
        </div>
      </div>
    </BarContainer>
  );
};
export default Bar;

const BarContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 14px;
  line-height: 20px;

  .graph {
    width: 100%;
    height: 100%;
    padding-left: 8px;

    .bar {
      height: 100%;
      justify-content: ${({ freq }) => (freq > 0 ? "flex-end" : "center")};
      padding-right: ${({ freq }) => (freq > 0 ? "8px" : 0)};
      background-color: ${(props) => {
        if (props.winRow)
          return props.darkTheme
            ? "var(--dark-mode-correct)"
            : "var(--light-mode-correct)";
        return props.darkTheme
          ? "var(--dark-mode-wrong)"
          : "var(--light-mode-wrong)";
      }};
      height: 100%;
      display: flex;
      box-sizing: content-box;
    }

    .num-guesses {
      font-weight: bold;
      color: white;
    }
  }
`;
