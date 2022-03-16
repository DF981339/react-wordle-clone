import { useState, useLayoutEffect, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useBoardSize = (boardContainerRef) => {
  const [boardHeight, setBoardHeight] = useState();
  const [boardWidth, setBoardWidth] = useState();
  const { windowHeight } = useWindowSize();

  const handleResize = () => {
    const width = Math.min(
      Math.floor(boardContainerRef.current.clientHeight * (5 / 6)),
      365,
      boardContainerRef.current.clientWidth
    );
    const height = 6 * Math.floor(width / 5);

    setBoardHeight(height - 3);
    setBoardWidth(width);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, [windowHeight]);

  return { boardHeight, boardWidth };
};

export default useBoardSize;
