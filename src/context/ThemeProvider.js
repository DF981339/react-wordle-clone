import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

// provider
export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    setDarkTheme(JSON.parse(localStorage.getItem("darkTheme")));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

// custom hook for other component to use
export const useTheme = () => {
  return [useContext(ThemeContext), useContext(ThemeUpdateContext)];
};
