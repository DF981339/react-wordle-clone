import { useState, useEffect, useLayoutEffect } from "react";

const useWindowSize = () => {
  const [windowHeight, setWindowHeight] = useState();
  const [windowWidth, setWindowWidth] = useState();

  const handleResize = () => {
    setWindowHeight(document.documentElement.clientHeight);
    setWindowWidth(document.documentElement.clientWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useLayoutEffect(() => {
  //   handleResize();
  // }, [windowHeight]);

  return { windowHeight, windowWidth };
};

export default useWindowSize;
