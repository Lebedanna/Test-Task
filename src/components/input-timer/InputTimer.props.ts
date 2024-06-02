import {Timer} from "../../context/TimerContext.tsx";

export interface InputTimerProps {
    handleStart: (time: { minutes: string, seconds: string }) => void;
    addTimer: (timer: Timer) => void;
}
