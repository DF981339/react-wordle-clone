import { WordProvider } from "./context/WordProvider";
import reducer, { initialState } from "./context/reducer";

function App() {
  return (
    <div>
      <WordProvider
        inititalState={initialState}
        reducer={reducer}
      ></WordProvider>
    </div>
  );
}

export default App;
