import { WordProvider } from "./context/WordProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";
import styled, { createGlobalStyle } from "styled-components";
import Keyboard from "./components/Keyboard";
import Guesses from "./components/Guesses";
import Header from "./components/Header";
import HowToPlay from "./components/HowToPlay";
import { useHelp, useSetting } from "./context/HeaderFunctionProvider";
import Setting from "./components/Setting";
import useWindowHeight from "./utils/useWindowHeight";

function App() {
  const [showHelp, setShowHelp] = useHelp();
  const [showSetting, setShowSetting] = useSetting();
  const height = useWindowHeight(window.innerHeight);

  return (
    <Container style={{ height: height }}>
      <GlobalStyle />
      <WordProvider inititalState={initialState} reducer={reducer}>
        {showHelp ? <HowToPlay /> : null}
        {showSetting ? <Setting /> : null}
        <Header />
        {/* <Guesses /> */}
        <Keyboard />
      </WordProvider>
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: Arial;
    margin: 0;
  }

  :root {
    --header-height: 60px;
    --keyboard-height: 212px;
    --game-max-width: 500px;
    
    --light-mode-bg: white;
    --light-mode-header-text: black;
    --light-mode-header-icon: hsl(0, 0%, 96%);
    --light-mode-header-border: hsl(214, 9%, 84%);
    --light-mode-footer-text: hsl(200, 2%, 48%);
    --light-mode-correct: hsl(115, 29%, 53%);
    --light-mode-wrong-location: hsl(49, 51%, 57%);
    --light-mode-wrong: hsl(200, 2%, 48%);
    --light-mode-tile-border: hsl(204, 2%, 54%);
    --light-mode-tile-text-before: black;
    --light-mode-tile-text-after: white;
    --light-mode-key-bg: hsl(214, 9%, 84%);
    --light-mode-key-text-before: black;
    --light-mode-key-text-after: white;
    
    --dark-mode-bg: hsl(240, 3%, 7%);
    --dark-mode-header-text: white;
    --dark-mode-header-icon: hsl(200, 1%, 51%);
    --dark-mode-header-border: hsl(240, 2%, 23%);
    --dark-mode-footer-text: hsl(200, 1%, 51%);
    --dark-mode-correct:hsl(115, 29%, 43%);
    --dark-mode-wrong-location: hsl(49, 51%, 47%);
    --dark-mode-wrong: hsl(240, 2%, 23%);
    --dark-mode-tile-border: hsl(210, 1%, 34%);
    --dark-mode-tile-text-before: white;
    --dark-mode-tile-text-after: white;
    --dark-mode-key-bg: hsl(200, 1%, 51%);
    --dark-mode-key-text-before: white;
    --dark-mode-key-text-after: white;
  }

  body {
    background-color: var(--dark-mode-bg);
  }

  p {
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
`;

const Container = styled.main`
  height: 100%;
  max-width: var(--game-max-width);
  margin: 0 auto;
  position: relative;
`;
