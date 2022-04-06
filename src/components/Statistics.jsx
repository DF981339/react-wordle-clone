import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useShowStats } from "../context/HeaderFunctionProvider";
import Bar from "./Bar";
import { useStats } from "../context/StatsProvider/StatsProvider";
import Overlay from "../shared/Overlay";
import CloseButton from "../shared/CloseButton";
import CenterModal from "../shared/CenterModal";
import useCountdown from "../utils/useCountdown";

const Statistics = () => {
  const [darkTheme, setDarkTheme] = useTheme();
  const [showStats, setShowStats] = useShowStats();
  const [slideAnimation, setSlideAnimation] = useState("up");
  const [slideOutNow, setSlideOutNow] = useState(false);
  const [state, dispatch] = useStats();
  const countDownTime = useCountdown();

  const handleClose = () => {
    setSlideAnimation("down");
    setSlideOutNow(true);
  };

  return (
    <StatsOverlay
      animation={slideAnimation}
      onAnimationEnd={slideOutNow ? () => setShowStats() : null}
      darkTheme={darkTheme}
    >
      <StatsModal darkTheme={darkTheme} handleClose={handleClose}>
        <ModalCloseButton darkTheme={darkTheme} onClick={handleClose} />

        <div className="content">
          <h1 className="title">STATISTICS</h1>
          <div className="statistics">
            <div className="statistic-container">
              <div className="statistic">{state.gamesPlayed}</div>
              <div className="label">Played</div>
            </div>
            <div className="statistic-container">
              <div className="statistic">{state.winPercentage}</div>
              <div className="label">Win %</div>
            </div>
            <div className="statistic-container">
              <div className="statistic">{state.currentStreak}</div>
              <div className="label">Current Streak</div>
            </div>
            <div className="statistic-container">
              <div className="statistic">{state.maxStreak}</div>
              <div className="label">Max Streak</div>
            </div>
          </div>

          <h1 className="title">GUESS DISTRIBUTION</h1>
          <div className="guess-distribution">
            {state.guesses.map(
              ({ guess, frequence }) =>
                guess !== "fail" && (
                  <Bar
                    key={guess}
                    guess={guess}
                    freq={frequence}
                    width={
                      frequence === 0
                        ? 7
                        : Math.floor((frequence / state.averageGuesses) * 100)
                    }
                  />
                )
            )}
          </div>

          <div className="footer">
            <div className="timer">
              <h4>NEXT WORDLE</h4>
              <h3>{countDownTime}</h3>
            </div>
            <h5>
              Thank you for playing the <span className="react">React</span>{" "}
              <span className="wordle">Wordle</span>{" "}
              <span className="clone">Clone</span>!
            </h5>
          </div>
        </div>
      </StatsModal>
    </StatsOverlay>
  );
};
export default Statistics;

const StatsOverlay = styled(Overlay)`
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

const StatsModal = styled(CenterModal)`
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

    .footer {
      text-align: center;
      color: ${(props) =>
        props.darkTheme
          ? "var(--dark-mode-footer-text)"
          : "var(--light-mode-footer-text)"};

      h5 {
        font-size: 15px;
        padding: 5px 0;
      }

      .timer {
        color: ${(props) =>
          props.darkTheme
            ? "var(--dark-mode-stats-text)"
            : "var(--light-mode-stats-text)"};

        h3 {
          font-size: clamp(36px, 5vmin, 40px);
          font-weight: 400;
          padding: 10px 0;
        }
      }
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
`;

const ModalCloseButton = styled(CloseButton)`
  right: 16px;
`;