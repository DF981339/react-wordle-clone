import React, { useState } from "react";
import styled from "styled-components";
import { useSetting } from "../context/HeaderFunctionProvider";
import { targetWord } from "../context/reducer";

const year = new Date().getFullYear();

const Setting = () => {
  const [showSetting, setShowSetting] = useSetting();
  const [slideAnimation, setSlideAnimation] = useState("up");
  const [slideOutNow, setSlideOutNow] = useState(false);

  const handleClose = () => {
    setSlideAnimation("down");
    setSlideOutNow(true);
  };

  return (
    <Container
      animation={slideAnimation}
      onAnimationEnd={slideOutNow ? setShowSetting : null}
    >
      <header>
        <div className="title">SETTINGS</div>
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

      <div className="setting">
        {/* TODO: add light theme and hard mode */}
        <div className="text">
          Settings coming soon...
          <p className="description">(Hard Mode, Toggle Theme...)</p>
        </div>

        <div className="setting-item">
          <div className="label">Feedback</div>
          <div className="link">
            <a href="mailto:df981339@gmail.com?subject=React-Wordle-Clone%20Feedback">
              Email
            </a>
          </div>
        </div>

        <div className="setting-item">
          <div className="label">Project Link</div>
          <div className="link">
            <a
              href="https://github.com/DF981339/react-wordle-clone"
              target="blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <footer>
        <div>© {year}, React Wordle Clone</div>
        <div>Answer: {targetWord.toUpperCase()}</div>
      </footer>
    </Container>
  );
};

export default Setting;

const Container = styled.section`
  position: absolute;
  color: lightgray;
  width: 100%;
  height: 100%;
  background-color: hsl(240, 3%, 7%);
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: -6px;

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
      fill: hsl(200, 1%, 51%);
      position: absolute;
      right: 0;
      user-select: none;
      cursor: pointer;

      &:hover {
        fill: white;
      }
    }
  }

  .setting {
    flex-grow: 1;

    .setting-item {
      font-size: clamp(15px, 3vmin, 16px);
      border-bottom: 1px solid hsl(200, 1%, 51%);
      padding: 16px 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 480px) {
        padding: 16px;
        margin: 0 -16px;
      }

      .label {
        font-size: clamp(18px, 3vmin, 20px);
      }

      a {
        color: hsl(200, 1%, 51%);
      }
    }
  }

  .text {
    text-align: center;
    font-size: clamp(18px, 3vmin, 20px);
    border-bottom: 1px solid hsl(200, 1%, 51%);
    padding: 50px 0;

    @media (max-width: 480px) {
      padding: 50px 16px;
      margin: 0 -16px;
    }

    .description {
      font-size: 13px;
      color: hsl(200, 1%, 51%);
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: hsl(200, 1%, 51%);
  }
`;
