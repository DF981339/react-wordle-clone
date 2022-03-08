import React, { useState } from "react";
import styled from "styled-components";
import instructionData from "../assets/ui/instructionData.json";
import Tile from "./Tile";
import { useHelp } from "../context/HeaderFunctionProvider";

const HowToPlay = () => {
  const [showHelp, setShowHelp] = useHelp();
  const [slideAnimation, setSlideAnimation] = useState("up");
  const [slideOutNow, setSlideOutNow] = useState(false);

  const handleClose = () => {
    setSlideAnimation("down");
    setSlideOutNow(true);
  };

  return (
    <HelpContainer
      animation={slideAnimation}
      onAnimationEnd={slideOutNow ? setShowHelp : null}
    >
      <header>
        <div className="title">HOW TO PLAY</div>
        <div className="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            onClick={handleClose}
          >
            <path
              fill="var(--color-tone-1)"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            ></path>
          </svg>
        </div>
      </header>

      <div className="instructions">
        <p className="text">
          Guess the <strong>WORDLE</strong> in six tries.
        </p>
        <p className="text">
          Each guess mush be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p className="text">
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </div>

      <div className="examples">
        <p>
          <strong>Examples</strong>
        </p>
        <div className="example-grid">
          {instructionData.correctExample.map(({ id, value, status, flip }) => (
            <Tile key={id} id={id} value={value} status={status} flip={flip} />
          ))}
        </div>
        <p className="text">
          The letter W is in the word and in the correct spot.
        </p>

        <div className="example-grid">
          {instructionData.wrongLocationExample.map(
            ({ id, value, status, flip }) => (
              <Tile
                key={id}
                id={id}
                value={value}
                status={status}
                flip={flip}
              />
            )
          )}
        </div>
        <p className="text">
          The letter I is in the word but in the wrong spot.
        </p>

        <div className="example-grid">
          {instructionData.wrongExample.map(({ id, value, status, flip }) => (
            <Tile key={id} id={id} value={value} status={status} flip={flip} />
          ))}
        </div>
        <p className="text">The letter U is not in the word in any spot.</p>
      </div>

      <p className="text">
        <strong>A new WORDLE will be available each day!</strong>
      </p>
    </HelpContainer>
  );
};

export default HowToPlay;

const HelpContainer = styled.section`
  position: absolute;
  color: var(--dark-mode-header-text);
  background-color: var(--dark-mode-bg);
  z-index: 2;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .title {
      font-weight: bold;
      font-size: clamp(16px, 3vmin, 18px);
    }

    .close {
      fill: var(--dark-mode-header-icon);
      position: absolute;
      right: 0;
      user-select: none;
      cursor: pointer;

      &:hover {
        fill: var(--dark-mode-header-text);
      }
    }
  }

  .examples {
    border-top: 1px solid var(--dark-mode-header-border);
    border-bottom: 1px solid var(--dark-mode-header-border);

    .example-grid {
      display: grid;
      grid-template-columns: repeat(5, 50px);
      grid-template-rows: repeat(1, 50px);
      gap: 5px;
    }
  }

  .text {
    font-size: clamp(15px, 3vmin, 16px);
  }

  ${(props) => {
    if (props.animation === "up") {
      return `
          animation: SlideUp 100ms linear;
        `;
    } else if (props.animation === "down") {
      return `
          animation: SlideDown 100ms linear;
        `;
    }
  }}

  @keyframes SlideUp {
    0% {
      height: calc(100% - 30px);
      transform: translateY(30px);
      opacity: 0;
    }

    100% {
      height: 100%;
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes SlideDown {
    0% {
      height: 100%;
      transform: translateY(0px);
      opacity: 1;
    }

    100% {
      height: calc(100% - 30px);
      transform: translateY(30px);
      opacity: 0;
    }
  }
`;
