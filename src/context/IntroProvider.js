import React, { createContext, useContext, useState, useEffect } from "react";

const IntroContext = createContext();
const IntroUpdateContext = createContext();

// provider
export const IntroProvider = ({ children }) => {
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem("firstTime");
    setFirstTime(localData ? JSON.parse(localData) : true);
  }, []);

  useEffect(() => {
    localStorage.setItem("firstTime", firstTime);
  }, [firstTime]);

  return (
    <IntroContext.Provider value={firstTime}>
      <IntroUpdateContext.Provider value={() => setFirstTime(false)}>
        {children}
      </IntroUpdateContext.Provider>
    </IntroContext.Provider>
  );
};

// custom hook for other component to use
export const useShowIntro = () => {
  return [useContext(IntroContext), useContext(IntroUpdateContext)];
};
