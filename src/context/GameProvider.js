import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { targetWord, CLEAR_BOARD } from "./reducer";
import { useShowStats } from "./HeaderFunctionProvider";

const GameContext = createContext();

// provider
export const GameProvider = ({ reducer, inititalState, children }) => {
  const [gameState, setGameState] = useReducer(reducer, inititalState, () => {
    const localData = localStorage.getItem("gameStates");
    return localData ? JSON.parse(localData) : inititalState;
  });

  useEffect(() => {
    localStorage.setItem("gameStates", JSON.stringify(gameState));
  }, [gameState]);

  const firstUpdate = useRef(true);
  const [showStats, setShowStats] = useShowStats();

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setGameState({ type: CLEAR_BOARD });
      setShowStats(false);
    }
  }, [targetWord]);

  return (
    <GameContext.Provider value={[gameState, setGameState]}>
      {children}
    </GameContext.Provider>
  );
};

// custom hook for other component to use
export const useGame = () => useContext(GameContext);
