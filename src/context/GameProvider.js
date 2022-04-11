import React, { createContext, useContext, useReducer, useEffect } from "react";

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

  return (
    <GameContext.Provider value={[gameState, setGameState]}>
      {children}
    </GameContext.Provider>
  );
};

// custom hook for other component to use
export const useGame = () => useContext(GameContext);
