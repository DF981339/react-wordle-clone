import { WordProvider } from "./context/WordProvider";
import reducer, { initialState } from "./context/reducer";
import styled, { createGlobalStyle } from "styled-components";
import Keyboard from "./components/Keyboard";

function App() {
  return (
    <div>
      <GlobalStyle />
      <WordProvider inititalState={initialState} reducer={reducer}>
        <Container>
          <div>header</div>
          <div>body</div>
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
  border: 1px solid white;

  height: 100vh;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
