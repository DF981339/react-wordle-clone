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
  ENABLE_INTERACTION,
} from "../context/reducer";

const Tile = ({ value, status, shake, flip, id, index }) => {
  const [state, dispatch] = useWord();
  const [flipNow, setFlipNow] = useState(false);

  // flip animation, one after another
  useEffect(() => {
    const flipTimer = setTimeout(() => {
      if (flip) {
        setFlipNow(true);
      }
    }, ((index % WORD_LENGTH) * FLIP_ANIMATION_DURATION) / 2);

    return () => clearTimeout(flipTimer);
  }, [flip]);

  const handleTransitionEnd = () => {
    setFlipNow(false);
    dispatch({
      type: FLIP_TILE_RESET,
      payload: { id: id },
    });
    dispatch({
      type: UPDATE_TILE_STATUS,
      payload: { id: id, index: index % WORD_LENGTH },
    });
    dispatch({
      type: UPDATE_KEY_STATUS,
      payload: { id: id },
    });
    dispatch({
      type: ENABLE_INTERACTION,
    });
  };

  return (
    <TileContainer
      status={status}
      shake={shake}
      onAnimationEnd={() => dispatch({ type: SHAKE_TILE_RESET })}
      flip={flipNow}
      onTransitionEnd={flipNow ? handleTransitionEnd : null}
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
`;
