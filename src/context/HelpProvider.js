import React, { createContext, useContext, useState } from "react";

const HelpContext = createContext();
const HelpUpdateContext = createContext();

// provider
export const HelpProvider = ({ children }) => {
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp((prevShowHelp) => !prevShowHelp);
  };

  return (
    <HelpContext.Provider value={showHelp}>
      <HelpUpdateContext.Provider value={toggleHelp}>
        {children}
      </HelpUpdateContext.Provider>
    </HelpContext.Provider>
  );
};

// custom hook for other component to use
export const useHelp = () => {
  return [useContext(HelpContext), useContext(HelpUpdateContext)];
};
// export const useHelp = () => useContext(HelpContext);
// export const useHelpUpdate = () => useContext(HelpUpdateContext);
