import { useState } from "react";
import styled from "styled-components";
import Overlay from "../shared/Overlay";
import CenterModal from "../shared/CenterModal";
import CloseButton from "../shared/CloseButton";
import { useTheme } from "../context/ThemeProvider";
import { useShowIntro } from "../context/IntroProvider";
import instructionData from "../assets/ui/instructionData.json";
import Tile from "./Tile";
import reactIcon from "../assets/icon/react.png";
import scIcon from "../assets/icon/styled-components.png";

const Intro = () => {
  const [darkTheme, setDarkTheme] = useTheme();
  const [showIntro, setShowIntro] = useShowIntro();
  const [slideAnimation, setSlideAnimation] = useState("up");
  const [slideOutNow, setSlideOutNow] = useState(false);

  const handleClose = () => {
    setSlideAnimation("down");
    setSlideOutNow(true);
  };

  return (
    <IntroContainer
      animation={slideAnimation}
      onAnimationEnd={slideOutNow ? setShowIntro : null}
      darkTheme={darkTheme}
    >
      <IntroModal darkTheme={darkTheme} handleClose={handleClose}>
        <ModalCloseButton darkTheme={darkTheme} onClick={handleClose} />

        <div className="content">
          <h1 className="title">Welcome to React Wordle Clone!</h1>

          <section>
            <div className="instructions">
              <p className="text" style={{ marginTop: "0" }}>
                Everything works the same as the original{" "}
                <strong>WORDLE</strong>.
              </p>
              <p className="text">
                Guess the <strong>WORDLE</strong> in 6 tries with a valid 5
                letter word for each guess.
              </p>
              <p className="text">
                After each guess, the color of the tiles will show how close
                your guess was to the word.
              </p>
            </div>

            <div className="examples">
              <p className="strong-text">
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
                      tileSize={35}
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
                      tileSize={35}
                    />
                  )
                )}
              </div>
              <p className="text">
                The letter I is in the word but in the wrong spot.
              </p>

              <div className="example-grid">
                {instructionData.wrongExample.map(
                  ({ id, value, status, flip }) => (
                    <Tile
                      key={id}
                      id={id}
                      value={value}
                      status={status}
                      flip={flip}
                      tileSize={35}
                    />
                  )
                )}
              </div>
              <p className="text">
                The letter U is not in the word in any spot.
              </p>
            </div>
          </section>

          <footer>
            <div className="tech">
              <p className="text">
                This <strong>WORDLE</strong> clone is built with
              </p>
              <div className="icons">
                <img src={reactIcon} alt="react-icon" id="reactIcon" />
                <label htmlFor="reactIcon" style={{ marginRight: "15px" }}>
                  React
                </label>
                <img src={scIcon} alt="styled-components-icon" id="scIcon" />
                <label htmlFor="scIcon">Styled Components</label>
              </div>
            </div>

            <div className="github">
              <svg
                height="24"
                viewBox="0 0 16 16"
                width="24"
                id="github-icon"
                onClick={() =>
                  window.open("https://github.com/DF981339/react-wordle-clone")
                }
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>

              <label htmlFor="github-icon">
                <a
                  href="https://github.com/DF981339/react-wordle-clone"
                  target="blank"
                >
                  Project
                </a>
              </label>
            </div>
          </footer>
        </div>
      </IntroModal>
    </IntroContainer>
  );
};
export default Intro;

const IntroContainer = styled(Overlay)`
  ${(props) => {
    if (props.animation === "up") {
      return `
          animation: SlideUp 150ms linear;
        `;
    } else if (props.animation === "down") {
      return `
          animation: SlideDown 150ms linear;
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

const IntroModal = styled(CenterModal)`
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: clamp(16px, 3vmin, 20px);
      letter-spacing: 0.5px;
      margin: 10px 0;
      line-height: 20px;
      padding: 0 10px;
    }

    .icons {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    img {
      object-fit: contain;
      width: 5%;
      margin-right: 10px;
    }

    .github {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      color: ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-footer-text)"
          : "var(--light-mode-footer-text)"};
      fill: ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-footer-text)"
          : "var(--light-mode-footer-text)"};

      &:hover {
        color: ${(props) =>
          props.darkTheme
            ? "var(--dark-mode-header-text)"
            : "var(--light-mode-header-text)"};
        fill: ${(props) =>
          props.darkTheme
            ? "var(--dark-mode-header-text)"
            : "var(--light-mode-header-text)"};
      }

      a {
        color: inherit;
      }

      svg {
        cursor: pointer;
      }

      label {
        margin-left: 10px;
        white-space: nowrap;
      }

      @media (max-width: 440px) {
        label {
          display: none;
        }

        svg {
          margin-right: 10px;
        }
      }
    }

    section {
      padding: 10px;
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
        grid-template-columns: repeat(5, 35px);
        grid-template-rows: repeat(1, 35px);
        gap: 5px;
      }
    }

    .text {
      font-size: clamp(13px, 3vmin, 14px);
    }

    .strong-text {
      font-size: clamp(14px, 3vmin, 15px);
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 10px;
      font-size: clamp(10px, 3vmin, 12px);
      color: ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-footer-text)"
          : "var(--light-mode-footer-text)"};

      label {
        font-weight: bold;
      }

      .text {
        margin-block-start: 0;
        margin-block-end: 0;
        margin-bottom: 5px;
      }
    }
  }
`;

const ModalCloseButton = styled(CloseButton)`
  right: 16px;
`;
