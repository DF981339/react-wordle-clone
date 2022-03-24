import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useStats } from "../context/HeaderFunctionProvider";
import { CloseButton } from "../shared/sharedStyledComponents";
import Bar from "./Bar";

const Statistics = () => {
  const [darkTheme, setDarkTheme] = useTheme();
  const [showStats, setShowStats] = useStats();
  const [slideAnimation, setSlideAnimation] = useState("up");
  const [slideOutNow, setSlideOutNow] = useState(false);

  const statsRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (statsRef.current && !statsRef.current.contains(e.target)) handleClose();
  };

  const handleClose = () => {
    setSlideAnimation("down");
    setSlideOutNow(true);
  };

  return (
    <OverLay
      animation={slideAnimation}
      onAnimationEnd={slideOutNow ? setShowStats : null}
      darkTheme={darkTheme}
    >
      <div className="stats" ref={statsRef}>
        <ModalCloseButton className="close">
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
        </ModalCloseButton>

        <div className="content">
          <h1 className="title">STATISTICS</h1>
          <div className="statistics">
            <div className="statistic-container">
              <div className="statistic">1</div>
              <div className="label">Played</div>
            </div>
            <div className="statistic-container">
              <div className="statistic">100</div>
              <div className="label">Win %</div>
            </div>
            <div className="statistic-container">
              <div className="statistic">1</div>
              <div className="label">Current Streak</div>
            </div>
            <div className="statistic-container">
              <div className="statistic">1</div>
              <div className="label">Max Streak</div>
            </div>
          </div>

          <h1 className="title">GUESS DISTRIBUTION</h1>
          <div className="guess-distribution">
            <Bar guess={1} freq={1} width={100} />
            <Bar guess={2} freq={0} width={7} />
            <Bar guess={3} freq={0} width={7} />
            <Bar guess={4} freq={0} width={7} />
            <Bar guess={5} freq={0} width={7} />
            <Bar guess={6} freq={0} width={7} />
          </div>
        </div>
      </div>
    </OverLay>
  );
};
export default Statistics;

const OverLay = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.darkTheme ? "var(--dark-mode-overlay)" : "var(--light-mode-overlay)"};
  z-index: 10;

  .stats {
    border-radius: 8px;
    width: 90%;
    max-height: 90%;
    max-width: var(--game-max-width);
    overflow-y: auto;
    padding: 16px;
    border: 1px solid
      ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-stats-border)"
          : "var(--light-mode-stats-border)"};
    background-color: ${(props) =>
      props.darkTheme
        ? "var(--dark-mode-stats-bg)"
        : "var(--light-mode-stats-bg)"};
    color: ${(props) =>
      props.darkTheme
        ? "var(--dark-mode-stats-text)"
        : "var(--light-mode-stats-text)"};
    position: relative;
    box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 0;

      .title {
        font-size: 16px;
        letter-spacing: 0.5px;
        margin: 10px 0;
      }

      .statistics {
        display: flex;
        margin-bottom: 10px;

        .statistic-container {
          flex: 1;

          .statistic {
            font-size: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            letter-spacing: 0.05em;
            font-variant-numeric: proportional-nums;
          }

          .label {
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        }
      }

      .guess-distribution {
        padding-bottom: 10px;
        width: 80%;
      }
    }
  }

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

const ModalCloseButton = styled(CloseButton)`
  right: 16px;
`;
