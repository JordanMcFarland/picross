import React from "react";
import { useEffect } from "react";

const Timer = ({ timerIsActive, timer, setTimer }) => {
  useEffect(() => {
    let interval = null;

    if (timerIsActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerIsActive]);

  return (
    <div className="timer">
      <h4 style={{ margin: 0 }}>
        {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
      </h4>
      <h4 style={{ margin: 0 }}>
        {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}
      </h4>
    </div>
  );
};

export default Timer;
