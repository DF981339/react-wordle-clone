import { GameProvider } from "./context/GameProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";
import styled, { createGlobalStyle } from "styled-components";
import Keyboard from "./components/Keyboard";
import Guesses from "./components/Guesses";
import Header from "./components/Header";
import HowToPlay from "./components/HowToPlay";
import {
  useShowHelp,
  useShowSetting,
  useShowStats,
} from "./context/HeaderFunctionProvider";
import Setting from "./components/Setting";
import useWindowSize from "./utils/useWindowSize";
import UIProps from "./assets/ui/UIProps.json";
import { useTheme } from "./context/ThemeProvider";
import Statistics from "./components/Statistics";
import { useShowIntro } from "./context/IntroProvider";
import Intro from "./components/Intro";

const { headerHeight, keyboardHeight, gameMaxWidth } = UIProps;

function App() {
  const [showHelp, setShowHelp] = useShowHelp();
  const [showSetting, setShowSetting] = useShowSetting();
  const [showStats, setShowStats] = useShowStats();
  const [darkTheme, setDarkTheme] = useTheme();
  const [showIntro, setShowIntro] = useShowIntro();
  const { windowHeight } = useWindowSize();

  return (
    <Container style={{ height: windowHeight }}>
      <GlobalStyle darkTheme={darkTheme} />
      <GameProvider inititalState={initialState} reducer={reducer}>
        {showHelp ? <HowToPlay /> : null}
        {showSetting ? <Setting /> : null}
        {showStats ? <Statistics /> : null}
        {showIntro ? <Intro /> : null}
        <Header />
        <Guesses />
        <Keyboard />
      </GameProvider>
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
  }

  :root {
    --header-height: ${headerHeight}px;
    --keyboard-height: ${keyboardHeight}px;
    --game-max-width: ${gameMaxWidth}px;
    
    --light-mode-bg: white;
    --light-mode-header-text: black;
    --light-mode-header-icon: hsl(30, 1%, 48%);
    --light-mode-header-border: hsl(214, 9%, 84%);
    --light-mode-footer-text: hsl(200, 2%, 48%);
    --light-mode-alert-bg: hsl(24, 6%, 15%); /* may need to change */
    --light-mode-alert-text: hsl(204, 7%, 85%);
    --light-mode-active: hsl(204, 2%, 54%);
    --light-mode-correct: hsl(115, 29%, 53%);
    --light-mode-wrong-location: hsl(49, 51%, 57%);
    --light-mode-wrong: hsl(200, 2%, 48%);
    --light-mode-tile-border: hsl(214, 9%, 84%);
    --light-mode-tile-text-before: black;
    --light-mode-tile-text-after: white;
    --light-mode-key-bg: hsl(214, 9%, 84%);
    --light-mode-key-text-before: black;
    --light-mode-key-text-after: white;
    --light-mode-overlay: hsla(0, 0%, 100%, 0.5);
    --light-mode-stats-bg: white;
    --light-mode-stats-text: black;
    --light-mode-stats-border: hsl(210, 12%, 97%);
    
    --dark-mode-bg: hsl(240, 3%, 7%);
    --dark-mode-header-text: white;
    --dark-mode-header-icon: hsl(200, 1%, 51%);
    --dark-mode-header-border: hsl(240, 2%, 23%);
    --dark-mode-footer-text: hsl(200, 1%, 51%);
    --dark-mode-alert-bg: hsl(204, 7%, 85%);
    --dark-mode-alert-text: hsl(24, 6%, 15%);
    --dark-mode-active: hsl(210, 1%, 34%);
    --dark-mode-correct: hsl(115, 29%, 43%);
    --dark-mode-wrong-location: hsl(49, 51%, 47%);
    --dark-mode-wrong: hsl(240, 2%, 23%);
    --dark-mode-tile-border: hsl(240, 2%, 23%);
    --dark-mode-tile-text-before: white;
    --dark-mode-tile-text-after: white;
    --dark-mode-key-bg: hsl(200, 1%, 51%);
    --dark-mode-key-text-before: white;
    --dark-mode-key-text-after: white;
    --dark-mode-overlay: hsla(240, 3%, 7%, 0.5);
    --dark-mode-stats-bg: hsl(240, 3%, 7%);
    --dark-mode-stats-text: white;
    --dark-mode-stats-border: hsl(240, 2%, 10%);
    
    --switch-bg: hsl(210, 1%, 34%);
    --switch-knob: white;
  }

  body {
    background-color: ${(props) =>
      props.darkTheme ? "var(--dark-mode-bg)" : "var(--light-mode-bg)"};
  }

  p {
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
`;

const Container = styled.main`
  max-width: var(--game-max-width);
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;
