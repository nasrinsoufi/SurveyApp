import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ timeLeft, onTimeout }) => {
  const [timer, setTimer] = useState(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeout]);

  return (
    <div className="timer">
      Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}
      {timer % 60}
    </div>
  );
};

export default Timer;
