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
    <SettingContainer
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
    </SettingContainer>
  );
};

export default Setting;

const SettingContainer = styled.section`
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

  footer {
    display: flex;
    justify-content: space-between;
    font-size: clamp(12px, 3vmin, 14px);
    color: var(--dark-mode-footer-text);
  }

  .text {
    text-align: center;
    font-size: clamp(18px, 3vmin, 20px);
    border-bottom: 1px solid var(--dark-mode-header-border);
    padding: 50px 0;

    @media (max-width: 480px) {
      margin: 0 -16px;
    }

    .description {
      font-size: 13px;
      color: hsl(200, 1%, 51%);
    }
  }

  .setting {
    flex-grow: 1;

    .setting-item {
      font-size: clamp(15px, 3vmin, 16px);
      border-bottom: 1px solid var(--dark-mode-header-border);
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
        color: var(--dark-mode-footer-text);
      }
    }
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
