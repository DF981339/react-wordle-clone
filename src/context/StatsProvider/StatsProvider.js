import React, { createContext, useContext, useReducer, useEffect } from "react";

const StatsContext = createContext();

// provider
export const StatsProvider = ({ reducer, inititalState, children }) => {
  const [statsState, setStatsState] = useReducer(reducer, inititalState, () => {
    const localData = localStorage.getItem("statistics");
    return localData ? JSON.parse(localData) : inititalState;
  });

  useEffect(() => {
    localStorage.setItem("statistics", JSON.stringify(statsState));
  }, [statsState]);

  return (
    <StatsContext.Provider value={[statsState, setStatsState]}>
      {children}
    </StatsContext.Provider>
  );
};

// custom hook for other component to use
export const useStats = () => useContext(StatsContext);
