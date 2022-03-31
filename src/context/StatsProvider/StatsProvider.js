import React, { createContext, useContext, useReducer } from "react";

const StatsContext = createContext();

// provider
export const StatsProvider = ({ reducer, inititalState, children }) => {
  return (
    <StatsContext.Provider value={useReducer(reducer, inititalState)}>
      {children}
    </StatsContext.Provider>
  );
};

// custom hook for other component to use
export const useStats = () => useContext(StatsContext);
