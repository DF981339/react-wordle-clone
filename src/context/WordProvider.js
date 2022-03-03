import React, { createContext, useContext, useReducer } from "react";

const WordContext = createContext();

// provider
export const WordProvider = ({ reducer, inititalState, children }) => {
  return (
    <WordContext.Provider value={useReducer(reducer, inititalState)}>
      {children}
    </WordContext.Provider>
  );
};

// custom hook for other component to use
export const useWord = () => useContext(WordContext);
