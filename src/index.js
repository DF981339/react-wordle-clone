import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HeaderFunctionProvider } from "./context/HeaderFunctionProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { StatsProvider } from "./context/StatsProvider/StatsProvider";
import {
  statsInitialState,
  statsReducer,
} from "./context/StatsProvider/statsReducer";
import { IntroProvider } from "./context/IntroProvider";

ReactDOM.render(
  <React.StrictMode>
    <HeaderFunctionProvider>
      <ThemeProvider>
        <IntroProvider>
          <StatsProvider
            inititalState={statsInitialState}
            reducer={statsReducer}
          >
            <App />
          </StatsProvider>
        </IntroProvider>
      </ThemeProvider>
    </HeaderFunctionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
