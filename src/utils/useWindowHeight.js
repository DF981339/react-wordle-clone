import { useState, useEffect } from "react";

const useWindowHeight = (initialHeight) => {
  const [windowHeight, setWindowHeight] = useState(initialHeight);

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowHeight;
};

export default useWindowHeight;
