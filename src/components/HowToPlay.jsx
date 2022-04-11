import React, { useState } from "react";
import styled from "styled-components";
import instructionData from "../assets/ui/instructionData.json";
import Tile from "./Tile";
import { useShowHelp } from "../context/HeaderFunctionProvider";
import { useTheme } from "../context/ThemeProvider";
import CloseButton from "../shared/CloseButton";
import FullHeightModal from "../shared/FullHeightModal";

const HowToPlay = () => {
  const [showHelp, setShowHelp] = useShowHelp();
  const [darkTheme, setDarkTheme] = useTheme();
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
      darkTheme={darkTheme}
    >
      <header>
        <div className="title">HOW TO PLAY</div>
        <CloseButton darkTheme={darkTheme} onClick={handleClose} />
      </header>

      <section>
        <div className="instructions">
          <p className="text">
            Guess the <strong>WORDLE</strong> in 6 tries.
          </p>
          <p className="text">
            Each guess mush be a valid 5 letter word. Hit the enter button to
            submit.
          </p>
          <p className="text">
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>

        <div className="examples">
          <p>
            <strong>Examples</strong>
          </p>
          <div className="example-grid">
            {instructionData.correctExample.map(
              ({ id, value, status, flip }) => (
                <Tile
                  key={id}
                  id={id}
                  value={value}
                  status={status}
                  flip={flip}
                  tileSize={50}
                />
              )
            )}
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
                  tileSize={50}
                />
              )
            )}
          </div>
          <p className="text">
            The letter I is in the word but in the wrong spot.
          </p>

          <div className="example-grid">
            {instructionData.wrongExample.map(({ id, value, status, flip }) => (
              <Tile
                key={id}
                id={id}
                value={value}
                status={status}
                flip={flip}
                tileSize={50}
              />
            ))}
          </div>
          <p className="text">The letter U is not in the word in any spot.</p>
        </div>

        <p className="text">
          <strong>A new WORDLE will be available each day!</strong>
        </p>
      </section>
    </HelpContainer>
  );
};

export default HowToPlay;

const HelpContainer = styled(FullHeightModal)`
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .title {
      font-weight: bold;
      font-size: clamp(16px, 3vmin, 18px);
    }
  }

  section {
    padding: 0 16px;
  }

  .examples {
    border-top: 1px solid
      ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-header-border)"
          : "var(--light-mode-header-border)"};
    border-bottom: 1px solid
      ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-header-border)"
          : "var(--light-mode-header-border)"};

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
