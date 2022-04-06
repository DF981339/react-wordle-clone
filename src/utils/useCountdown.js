import { useState, useEffect } from "react";
import dayjs from "dayjs";

var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const calculateTimeLeft = () => {
  const now = dayjs();
  const tmrZeroOClock = dayjs().add(1, "day").format("YYYY-MM-DD");
  const diff = dayjs(tmrZeroOClock).diff(now);
  const duration = dayjs.duration(diff);
  return duration.format("HH:mm:ss");
};

const useCountdown = () => {
  const [countDown, setCountDown] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return countDown;
};

export default useCountdown;
