import React, { useState, useEffect, JSX } from "react";
import TimeUnit from "./TimeUnit";

interface CountdownProps {
  targetDate: string; // ISO 8601 date string, e.g., "2025-12-31T23:59:59"
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval when the component unmounts or the countdown finishes
    if (Object.keys(timeLeft).length === 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [timeLeft]); // Re-run effect when timeLeft changes

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex md:gap-4 gap-2 text-center">
      {timerComponents.length ? (
        <>
          <TimeUnit number={timeLeft.days || 0} label="Days" />
          <TimeUnit number={timeLeft.hours || 0} label="Hours" />
          <TimeUnit number={timeLeft.minutes || 0} label="Minutes" />
          <TimeUnit number={timeLeft.seconds || 0} label="Seconds" />
        </>
      ) : (
        <span>Countdown finished!</span>
      )}
    </div>
  );
};

export default Countdown;
