import React, { useState } from "react";
import styled from "styled-components";
import { useShowSetting } from "../context/HeaderFunctionProvider";
import { useTheme } from "../context/ThemeProvider";
import Switch from "./Switch";
import CloseButton from "../shared/CloseButton";
import FullHeightModal from "../shared/FullHeightModal";
import useSolution from "../utils/useSolution";

const year = new Date().getFullYear();

const Setting = () => {
  const [showSetting, setShowSetting] = useShowSetting();
  const [darkTheme, setDarkTheme] = useTheme();
  const [slideAnimation, setSlideAnimation] = useState("up");
  const [slideOutNow, setSlideOutNow] = useState(false);
  const solution = useSolution();

  const handleClose = () => {
    setSlideAnimation("down");
    setSlideOutNow(true);
  };

  return (
    <SettingContainer
      animation={slideAnimation}
      onAnimationEnd={slideOutNow ? setShowSetting : null}
      darkTheme={darkTheme}
    >
      <header>
        <div className="title">SETTINGS</div>
        <CloseButton darkTheme={darkTheme} onClick={handleClose} />
      </header>

      <div className="setting">
        <div className="setting-item">
          <div className="text">
            Hard Mode
            <div className="description">
              Any revealed hints must be used in subsequent guesses
            </div>
          </div>
          <div className="coming-soon">coming soon...</div>
        </div>

        <div className="setting-item">
          <div className="label">Dark Theme</div>
          <Switch />
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
        <div>Answer: {solution.toUpperCase()}</div>
      </footer>
    </SettingContainer>
  );
};

export default Setting;

const SettingContainer = styled(FullHeightModal)`
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

  footer {
    display: flex;
    justify-content: space-between;
    font-size: clamp(12px, 3vmin, 14px);
    color: ${(props) =>
      props.darkTheme
        ? "var(--dark-mode-footer-text)"
        : "var(--light-mode-footer-text)"};
  }

  .text {
    font-size: clamp(18px, 3vmin, 20px);

    .description {
      font-size: 13px;
      color: hsl(200, 1%, 51%);
    }
  }

  .coming-soon {
    font-size: 13px;
    color: hsl(200, 1%, 51%);
  }

  .setting {
    flex-grow: 1;

    .setting-item {
      font-size: clamp(15px, 3vmin, 16px);
      border-bottom: 1px solid
        ${(props) =>
          props.darkTheme
            ? "var(--dark-mode-header-border)"
            : "var(--light-mode-header-border)"};
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
        color: ${(props) =>
          props.darkTheme
            ? "var(--dark-mode-footer-text)"
            : "var(--light-mode-footer-text)"};
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
