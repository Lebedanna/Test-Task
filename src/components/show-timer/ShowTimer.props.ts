export interface ShowTimerProps {
    minutes: number;
    seconds: number;
    isPaused: boolean;
    handlePause: () => void;
    handleReset: () => void;
    handleResume: () => void;
    totalMinutes: number,
    totalSeconds: number
}