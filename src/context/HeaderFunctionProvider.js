import React, { createContext, useContext, useState } from "react";

const HelpContext = createContext();
const HelpUpdateContext = createContext();

const SettingContext = createContext();
const SettingUpdateContext = createContext();

// provider
export const HeaderFunctionProvider = ({ children }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const toggleHelp = () => {
    setShowHelp((prevShowHelp) => !prevShowHelp);
  };

  const toggleSetting = () => {
    setShowSetting((prevShowSetting) => !prevShowSetting);
  };

  return (
    <HelpContext.Provider value={showHelp}>
      <HelpUpdateContext.Provider value={toggleHelp}>
        <SettingContext.Provider value={showSetting}>
          <SettingUpdateContext.Provider value={toggleSetting}>
            {children}
          </SettingUpdateContext.Provider>
        </SettingContext.Provider>
      </HelpUpdateContext.Provider>
    </HelpContext.Provider>
  );
};

// custom hook for other component to use
export const useHelp = () => {
  return [useContext(HelpContext), useContext(HelpUpdateContext)];
};
export const useSetting = () => {
  return [useContext(SettingContext), useContext(SettingUpdateContext)];
};
