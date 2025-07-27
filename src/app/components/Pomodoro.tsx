"use client";
import { useEffect, useState } from "react";
import { usePomodoroStore } from "../lib/pomodoroStore";

export const Pomodoro = () => {
  const {
    mode,
    isRunning,
    startTime,
    duration,
    sessionCount,
    startTimer,
    stopTimer,
    resetTimer,
    incrementSession,
    pausedTimeLeft,
  } = usePomodoroStore();

  // Calculate initial timeLeft immediately based on startTime and duration
  const calculateTimeLeft = () => {
    if (isRunning && startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const left = duration - elapsed;
      return left > 0 ? left : 0;
    } else if (!isRunning && pausedTimeLeft !== null) {
      return pausedTimeLeft;
    }
    return duration;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(pausedTimeLeft ?? duration);
      return;
    }
    if (!startTime) {
      setTimeLeft(duration);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const left = duration - elapsed;

      if (left <= 0) {
        clearInterval(interval);
        // session ended logic...
      } else {
        setTimeLeft(left);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    startTime,
    duration,
    pausedTimeLeft,
    mode,
    sessionCount,
    incrementSession,
    resetTimer,
  ]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartPause = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer(mode, duration);
    }
  };

  const handleReset = () => {
    stopTimer();
    resetTimer(mode, duration);
    setTimeLeft(duration);
  };

  const displayLabel = {
    work: "Work",
    "short-break": "Short Break",
    "long-break": "Long Break",
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#272030] p-6 sm:p-8 rounded-md shadow-lg flex flex-col items-center justify-center space-y-6 text-center">
        <span
          className="px-4 py-1 rounded-sm bg-[#e3ebf2] text-[#272030]
          font-medium text-sm uppercase tracking-widest"
        >
          {displayLabel[mode]}
        </span>

        <div className="text-7xl sm:text-8xl font-mono text-[#e3ebf2]">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={handleStartPause}
            className="cursor-pointer px-5 py-2.5 bg-[#e3ebf2] text-[#272030] rounded-sm text-base font-semibold transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="cursor-pointer px-5 py-2.5 bg-[#e3ebf2] text-[#272030] rounded-sm text-base font-semibold transition"
          >
            Reset
          </button>
        </div>

        <p className="text-sm text-[#e3ebf2]">
          Sessions Completed:{" "}
          <span className="font-semibold text-[#e3ebf2]">{sessionCount}</span>
        </p>
      </div>
    </div>
  );
};
