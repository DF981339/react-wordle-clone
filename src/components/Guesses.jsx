import { useRef, useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../context/GameProvider";
import Alerts from "./Alerts";
import Tile from "./Tile";
import useBoardSize from "../utils/useBoardSize";
import { useStats } from "../context/StatsProvider/StatsProvider";
import {
  UPDATE_WIN_LOSE,
  UPDATE_WIN_PERCENTAGE,
  UPDATE_STREAK,
  UPDATE_DISTRIBUTION,
  UPDATE_AVERAGE_GUESSES,
} from "../context/StatsProvider/statsReducer";
import { useShowStats } from "../context/HeaderFunctionProvider";
import { targetWord, CLEAR_BOARD } from "../context/reducer";

const Guesses = () => {
  const [state, dispatch] = useGame();
  const boardContainerRef = useRef(null);
  const { boardHeight, boardWidth } = useBoardSize(boardContainerRef);
  const [statsState, statsDispatch] = useStats();
  const [showStats, setShowStats] = useShowStats();

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      dispatch({ type: CLEAR_BOARD });
      setShowStats(false);
    }
  }, [targetWord]);

  useEffect(() => {
    let statsTimer;
    if (state.win !== "in progress") {
      statsDispatch({
        type: UPDATE_WIN_LOSE,
        payload: { winOrLose: state.win },
      });
      statsDispatch({
        type: UPDATE_WIN_PERCENTAGE,
      });
      statsDispatch({
        type: UPDATE_STREAK,
        payload: { winOrLose: state.win },
      });
      statsDispatch({
        type: UPDATE_DISTRIBUTION,
        payload: { winRow: state.winRow },
      });
      statsDispatch({
        type: UPDATE_AVERAGE_GUESSES,
      });
      statsTimer = setTimeout(() => {
        setShowStats(true);
      }, 1000);
    }

    return () => clearTimeout(statsTimer);
  }, [state.win]);

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
