import { WordProvider } from "./context/WordProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";
import styled, { createGlobalStyle } from "styled-components";
import Keyboard from "./components/Keyboard";
import Guesses from "./components/Guesses";
import Header from "./components/Header";
import HowToPlay from "./components/HowToPlay";
import { useHelp } from "./context/HelpProvider";

function App() {
  const [showHelp, setShowHelp] = useHelp();

  return (
    <div>
      <GlobalStyle />
      <WordProvider inititalState={initialState} reducer={reducer}>
        <Container>
          {showHelp ? <HowToPlay /> : null}
          <Header />
          <Guesses />
          <Keyboard />
        </Container>
      </WordProvider>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: Arial;
  }

  body {
    background-color: hsl(240, 3%, 7%);
    display: flex;
    justify-content: center;
    margin: 0;
  }
  `;

const Container = styled.main`
  max-width: 700px;

  height: 100vh;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
