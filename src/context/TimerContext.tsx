import {createContext, FC, ReactNode, useState} from 'react';

interface TimerProviderProps {
    children: ReactNode;
}

export interface Timer {
    id: number;
    duration: number;
    originalDuration: number;
    isRunning: boolean;
    elapsedTime: number;
}

export interface TimerContextType {
    timers: Timer[];
    addTimer: (timer: Timer) => void;
    removeTimer: (id: number) => void;
    pauseAllTimers: () => void;
    resetAllTimers: () => void;
    startTimer: (id: number) => void;
    updateTimerRunningState: (id: number, isRunning: boolean) => void;
    deleteAllTimers: () => void;
    stopTimer: (id: number) => void;
    startAllTimers: () => void;
    activeTimerId: number | null;
    setActiveTimerId: (id: number | null) => void;
    resetElapsedTime: (id: number) => void;
}

const TimerContext = createContext<TimerContextType>({
    timers: [],
    addTimer: () => {
    },
    startTimer: () => {
    },
    removeTimer: () => {
    },
    pauseAllTimers: () => {
    },
    resetAllTimers: () => {
    },
    updateTimerRunningState: () => {
    },
    stopTimer: () => {
    },
    deleteAllTimers: () => {
    },
    startAllTimers: () => {
    },
    activeTimerId: null,
    setActiveTimerId: () => {
    },
    resetElapsedTime: () => {
    },
});

export const TimerProvider: FC<TimerProviderProps> = ({children}) => {
    const [timers, setTimers] = useState<Timer[]>([
        {
            id: 1, duration: 300,
            originalDuration: 300,
            isRunning: false,
            elapsedTime: 0
        },
        {
            id: 2, duration: 600,
            originalDuration: 600,
            isRunning: false,
            elapsedTime: 0
        },
        {
            id: 3, duration: 120,
            originalDuration: 120,
            isRunning: false,
            elapsedTime: 0
        },
    ]);
    const [activeTimerId, setActiveTimerId] = useState<number | null>(null);

    const addTimer = (timer: Timer) => {
        timer.originalDuration = timer.duration;
        timer.elapsedTime = 0;
        setTimers([...timers, timer]);
    };

    const startTimer = (id: number) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? {...timer, isRunning: true, elapsedTime: timer.elapsedTime + 1} : timer
        ));
    };

    const stopTimer = (id: number) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? {...timer, isRunning: false} : timer
        ));
    };

    const startAllTimers = () => {
        timers.forEach(timer => startTimer(timer.id));
    };

    const resetAllTimers = () => {
        setTimers(prevTimers => prevTimers.map(timer => {
            return {...timer, duration: timer.originalDuration, isRunning: false, elapsedTime: 0};
        }));
    };

    const removeTimer = (id: number) => {
        setTimers(timers.filter(timer => timer.id !== id));
    };

    const pauseAllTimers = () => {
        setTimers(prevTimers => prevTimers.map(timer => ({...timer, isRunning: false})));
    };

    const updateTimerRunningState = (id: number, isRunning: boolean) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? {...timer, isRunning, elapsedTime: isRunning ? timer.elapsedTime + 1 : timer.elapsedTime} : timer
        ));
    };

    const resetElapsedTime = (id: number) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? {...timer, elapsedTime: 0} : timer
        ));
    };

    const deleteAllTimers = () => {
        setTimers([]);
    };

    return (
        <TimerContext.Provider value={{
            timers,
            activeTimerId,
            addTimer,
            removeTimer,
            startTimer,
            setActiveTimerId,
            pauseAllTimers,
            stopTimer,
            updateTimerRunningState,
            resetAllTimers,
            deleteAllTimers,
            startAllTimers,
            resetElapsedTime
        }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContext;
