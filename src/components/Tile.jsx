import { useState, useEffect } from "react";
import styled from "styled-components";
import { useWord } from "../context/WordProvider";
import {
  SHAKE_TILE_RESET,
  FLIP_TILE_RESET,
  FLIP_ANIMATION_DURATION,
  UPDATE_TILE_STATUS,
  WORD_LENGTH,
  UPDATE_KEY_STATUS,
  CHECK_WIN_LOSE,
  BOUNCE_ANIMATION_DURATION,
} from "../context/reducer";
import { useHelp } from "../context/HeaderFunctionProvider";

const Tile = ({ value, status, shake, flip, id, index, bounce }) => {
  const [state, dispatch] = useWord();
  const [showHelp, setShowHelp] = useHelp();
  const [flipNow, setFlipNow] = useState(false);
  const [bounceNow, setBounceNow] = useState(false);

  // flip animation, one after another
  useEffect(() => {
    const flipTimer = setTimeout(() => {
      if (flip) {
        setFlipNow(true);
      }
    }, ((index % WORD_LENGTH) * FLIP_ANIMATION_DURATION) / 2);

    return () => clearTimeout(flipTimer);
  }, [flip]);

  // bounce animation, one after another
  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      if (bounce) {
        setBounceNow(true);
      }
    }, ((index % WORD_LENGTH) * BOUNCE_ANIMATION_DURATION) / 5);

    return () => clearTimeout(bounceTimer);
  }, [bounce]);

  const handleTransitionEnd = () => {
    setFlipNow(false);
    dispatch({
      type: FLIP_TILE_RESET,
      payload: { id: id },
    });
    dispatch({
      type: UPDATE_TILE_STATUS,
      payload: { id: id, index: index % WORD_LENGTH, isShowingHelp: showHelp },
    });
    dispatch({
      type: UPDATE_KEY_STATUS,
      payload: { id: id, isShowingHelp: showHelp },
    });
    dispatch({
      type: CHECK_WIN_LOSE,
      payload: { isShowingHelp: showHelp },
    });
  };

  return (
    <TileContainer
      status={status}
      shake={shake}
      onAnimationEnd={() => dispatch({ type: SHAKE_TILE_RESET })}
      flip={flipNow}
      onTransitionEnd={flipNow ? handleTransitionEnd : null}
      bounce={bounceNow}
    >
      {value}
    </TileContainer>
  );
};

export default Tile;

const TileContainer = styled.div`
  font-size: 2rem; /* might need to use clamp */
  font-weight: bold;
  color: white;
  border: 2px solid hsl(240, 2%, 23%);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  user-select: none;
  transition: transform 250ms linear;

  ${(props) => {
    if (props.status === "active") {
      return `
          border-color: hsl(200, 1%, 34%);
          animation: Pop 0.1s;
        `;
    } else if (props.status === "wrong") {
      return `
          border: none;
          background-color: hsl(240, 2%, 23%);
        `;
    } else if (props.status === "wrong-location") {
      return `
          border: none;
          background-color: hsl(49, 51%, 47%);
        `;
    } else if (props.status === "correct") {
      return `
          border: none;
          background-color: hsl(115, 29%, 43%);
        `;
    }
  }}

  ${(props) => {
    if (props.shake) {
      return `
          animation: Shake 0.5s ease-in-out;
        `;
    }
  }}

  @keyframes Shake {
    10%,
    90% {
      transform: translateX(-5%);
    }

    20%,
    80% {
      transform: translateX(5%);
    }

    30%,
    50%,
    70% {
      transform: translateX(-7.5%);
    }

    40%,
    60% {
      transform: translateX(7.5%);
    }
  }

  ${(props) => {
    if (props.flip) {
      return `
          transform: rotateX(90deg);
        `;
    }
  }}

  ${(props) => {
    if (props.bounce) {
      return `
          animation: Bounce 0.5s ease-in-out;
        `;
    }
  }}

  @keyframes Bounce {
    0%,
    20% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(-50%);
    }

    50% {
      transform: translateY(5%);
    }

    60% {
      transform: translateY(-25%);
    }

    80% {
      transform: translateY(2.5%);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes Pop {
    from {
      transform: scale(0.8);
      opacity: 0;
    }

    40% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
`;
