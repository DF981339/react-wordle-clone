import React, { createContext, useContext, useState } from "react";

const HelpContext = createContext();
const HelpUpdateContext = createContext();

const SettingContext = createContext();
const SettingUpdateContext = createContext();

const StatsContext = createContext();
const StatsUpdateContext = createContext();

// provider
export const HeaderFunctionProvider = ({ children }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const toggleHelp = () => {
    setShowHelp((prevShowHelp) => !prevShowHelp);
  };

  const toggleSetting = () => {
    setShowSetting((prevShowSetting) => !prevShowSetting);
  };

  const toggleStats = () => {
    setShowStats((prevShowStats) => !prevShowStats);
  };

  return (
    <HelpContext.Provider value={showHelp}>
      <HelpUpdateContext.Provider value={toggleHelp}>
        <SettingContext.Provider value={showSetting}>
          <SettingUpdateContext.Provider value={toggleSetting}>
            <StatsContext.Provider value={showStats}>
              <StatsUpdateContext.Provider value={toggleStats}>
                {children}
              </StatsUpdateContext.Provider>
            </StatsContext.Provider>
          </SettingUpdateContext.Provider>
        </SettingContext.Provider>
      </HelpUpdateContext.Provider>
    </HelpContext.Provider>
  );
};

// custom hook for other component to use
export const useShowHelp = () => {
  return [useContext(HelpContext), useContext(HelpUpdateContext)];
};
export const useShowSetting = () => {
  return [useContext(SettingContext), useContext(SettingUpdateContext)];
};
export const useShowStats = () => {
  return [useContext(StatsContext), useContext(StatsUpdateContext)];
};
