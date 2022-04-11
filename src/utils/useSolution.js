import { useState, useEffect } from "react";
import dayjs from "dayjs";
import targetWords from "../assets/data/targetWords.json";

const startDate = dayjs("2022-01-01");

const getTodaySolution = () => {
  const today = dayjs();
  const dayOffset = today.diff(startDate, "day");
  return targetWords[dayOffset];
};

const useSolution = () => {
  const [solution, setSolution] = useState(getTodaySolution());

  useEffect(() => {
    const interval = setInterval(() => {
      setSolution(getTodaySolution());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return solution;
};
export default useSolution;
