import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let get to it!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  function startTimer() {
    // Check 1 = prevent startTimer during active countdown;
    if (intervalRef.current !== null) return;

    // change isRunning Status to make... Start button disapper... Stop button appear
    setIsRunning(true);

    setTitle('Keep it up! Not too much time left!');
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  };
  
  function stopTimer() {
    if (intervalRef.current === null) return;
    setTitle('Taking a break? Don\'t go away for too long!');
    clearInterval(intervalRef.current);
    setIsRunning(false);

    //resetting intervalRef to pass Check 1
    intervalRef.current = null;
  }
  
  function resetTimer() {
    setTitle('Ready for another round?');
    clearInterval(intervalRef.current);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    
    //resetting intervalRef to pass Check 1
    intervalRef.current = null;
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning &&  <button onClick={startTimer}>Start</button>}
        {isRunning &&  <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
