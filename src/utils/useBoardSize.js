import { useState, useLayoutEffect } from "react";
import UIProps from "../assets/ui/UIProps.json";

const { headerHeight, keyboardHeight } = UIProps;

const useBoardSize = (windowHeight) => {
  const [boardHeight, setBoardHeight] = useState();
  const [boardWidth, setBoardWidth] = useState();
  const boardContainerHeight = windowHeight - headerHeight - keyboardHeight;

  const handleResize = () => {
    const width = Math.min(Math.floor(boardContainerHeight * (5 / 6)), 365);
    const height = 6 * Math.floor(width / 5);

    setBoardHeight(height - 3);
    setBoardWidth(width);
  };

  useLayoutEffect(() => {
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
