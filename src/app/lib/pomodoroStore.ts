import { create } from "zustand";

interface PomodoroState {
  mode: "work" | "short-break" | "long-break";
  isRunning: boolean;
  startTime: number | null;
  pausedTimeLeft: number | null;
  duration: number;
  sessionCount: number;

  startTimer: (mode: PomodoroState["mode"], duration: number) => void;
  stopTimer: () => void;
  resetTimer: (mode: PomodoroState["mode"], duration: number) => void;
  incrementSession: () => void;
}

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  mode: "work",
  isRunning: false,
  startTime: null,
  pausedTimeLeft: null,
  duration: 25 * 60,
  sessionCount: 0,

  startTimer: (mode, duration) => {
    const { pausedTimeLeft } = get();
    const now = Date.now();
    if (pausedTimeLeft != null) {
      // Resume from pause
      set({
        mode,
        duration,
        startTime: now - (duration - pausedTimeLeft) * 1000,
        isRunning: true,
        pausedTimeLeft: null,
      });
    } else {
      // New start
      set({
        mode,
        duration,
        startTime: now,
        isRunning: true,
        pausedTimeLeft: null,
      });
    }
  },

  stopTimer: () => {
    const { startTime, duration, isRunning } = get();
    if (!isRunning || !startTime) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const timeLeft = duration - elapsed;
    set({
      pausedTimeLeft: timeLeft > 0 ? timeLeft : 0,
      isRunning: false,
    });
  },

  resetTimer: (mode, duration) => {
    set({
      mode,
      duration,
      startTime: null,
      pausedTimeLeft: null,
      isRunning: false,
    });
  },

  incrementSession: () =>
    set((state) => ({ sessionCount: state.sessionCount + 1 })),
}));
