import React from "react";
import styled from "styled-components";
import { ADD_LETTER, DELETE_LETTER, GUESS_WORD } from "../context/reducer";
import { useWord } from "../context/WordProvider";
import { useTheme } from "../context/ThemeProvider";

const Key = ({ value, status }) => {
  const [state, dispatch] = useWord();
  const [darkTheme, setDarkTheme] = useTheme();

  const handleDelete = () => {
    dispatch({ type: DELETE_LETTER });
  };

  const handleEnter = () => {
    dispatch({ type: GUESS_WORD });
  };

  const handleAddKey = (e) => {
    dispatch({
      type: ADD_LETTER,
      payload: {
        letter: e.target.value,
      },
    });
  };

  return value.match(/\w[a-z]/) ? (
    value === "delete" ? (
      // delete key
      <LargeKey
        value={value}
        onClick={state.disableInteraction ? null : handleDelete}
        darkTheme={darkTheme}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="var(--color-tone-1)"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      </LargeKey>
    ) : value === "emptyLeft" || value === "emptyRight" ? (
      <div className="space"></div>
    ) : (
      // enter key
      <LargeKey
        value={value}
        onClick={state.disableInteraction ? null : handleEnter}
        darkTheme={darkTheme}
      >
        {value}
      </LargeKey>
    )
  ) : (
    <LetterKey
      value={value}
      status={status}
      onClick={state.disableInteraction ? null : handleAddKey}
      darkTheme={darkTheme}
    >
      {value}
    </LetterKey>
  );
};

export default Key;

const LetterKey = styled.button`
  font-size: clamp(13px, 3vmin, 18px);
  font-weight: bold;
  grid-column: span 2;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.darkTheme ? "var(--dark-mode-key-bg)" : "var(--light-mode-key-bg)"};
  color: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-key-text-before)"
      : "var(--light-mode-key-text-before)"};
  fill: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-key-text-before)"
      : "var(--light-mode-key-text-before)"};
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.darkTheme ? "hsl(200, 1%, 61%)" : "hsl(214, 9%, 74%)"};

    ${(props) => {
      if (props.status === "wrong") {
        if (props.darkTheme) {
          return `
          background-color: hsl(240, 2%, 33%);
        `;
        } else {
          return `
          background-color: hsl(200, 2%, 38%);
        `;
        }
      } else if (props.status === "wrong-location") {
        if (props.darkTheme) {
          return `
          background-color: hsl(49, 51%, 57%);
        `;
        } else {
          return `
          background-color: hsl(49, 51%, 47%);
        `;
        }
      } else if (props.status === "correct") {
        if (props.darkTheme) {
          return `
          background-color: hsl(115, 29%, 53%);
        `;
        } else {
          return `
          background-color: hsl(115, 29%, 43%);
        `;
        }
      }
    }}
  }

  ${(props) => {
    if (props.status === "wrong") {
      if (props.darkTheme) {
        return `
          color: var(--dark-mode-key-text-after);
          background-color: var(--dark-mode-wrong);
        `;
      } else {
        return `
          color: var(--light-mode-key-text-after);
          background-color: var(--light-mode-wrong);
        `;
      }
    } else if (props.status === "wrong-location") {
      if (props.darkTheme) {
        return `
          color: var(--dark-mode-key-text-after);
          background-color: var(--dark-mode-wrong-location);
        `;
      } else {
        return `
          color: var(--light-mode-key-text-after);
          background-color: var(--light-mode-wrong-location);
        `;
      }
    } else if (props.status === "correct") {
      if (props.darkTheme) {
        return `
          color: var(--dark-mode-key-text-after);
          background-color: var(--dark-mode-correct);
        `;
      } else {
        return `
          color: var(--light-mode-key-text-after);
          background-color: var(--light-mode-correct);
        `;
      }
    }
  }}
`;

const LargeKey = styled(LetterKey)`
  grid-column: span 3;

  svg {
    width: 1.75em;
    height: 1.75em;
  }
`;
