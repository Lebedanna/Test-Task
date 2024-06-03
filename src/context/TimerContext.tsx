import {createContext, FC, ReactNode, useState} from 'react';

interface TimerProviderProps {
    children: ReactNode;
}

export interface Timer {
    id: number;
    duration: number;
    originalDuration: number;
    isRunning: boolean;
}

export interface TimerContextType {
    timers: Timer[];
    addTimer: (timer: Timer) => void;
    removeTimer: (id: number) => void;
    pauseAllTimers: () => void;
    resetAllTimers: () => void;
    updateTimerRunningState: (id: number, isRunning: boolean) => void;
    deleteAllTimers: () => void;
    startAllTimers: () => void;
    activeTimerId: number | null;
    setActiveTimerId: (id: number | null) => void;
    resetElapsedTime: (id: number) => void;
}

const TimerContext = createContext<TimerContextType>({
    timers: [],
    addTimer: () => {
    },
    removeTimer: () => {
    },
    pauseAllTimers: () => {
    },
    resetAllTimers: () => {
    },
    updateTimerRunningState: () => {
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
            isRunning: false
        },
        {
            id: 2, duration: 600,
            originalDuration: 600,
            isRunning: false
        },
        {
            id: 3, duration: 120,
            originalDuration: 120,
            isRunning: false
        },
    ]);
    const [activeTimerId, setActiveTimerId] = useState<number | null>(null);

    const addTimer = (timer: Timer) => {
        timer.originalDuration = timer.duration;
        setTimers([...timers, timer]);
    };

    const startAllTimers = () => {
        setTimers(prevTimers => prevTimers.map(timer => ({...timer, isRunning: true})));
    }


    const removeTimer = (id: number) => {
        setTimers(timers.filter(timer => timer.id !== id));
    };

    const pauseAllTimers = () => {
        setTimers(prevTimers => prevTimers.map(timer => ({...timer, isRunning: false})));
        console.log(timers)
    };

    const updateTimerRunningState = (id: number, isRunning: boolean) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? {...timer, isRunning, duration: isRunning ? timer.duration - 1 : timer.duration} : timer
        ));
    };

    const resetElapsedTime = (id: number) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? {...timer, elapsedTime: 0} : timer
        ));
    };

    const resetAllTimers = () => {
        setTimers(prevTimers => prevTimers.map(timer => {
            resetElapsedTime(timer.id);
            return {...timer, duration: timer.originalDuration, isRunning: false};
        }));
    };

    const deleteAllTimers = () => {
        setTimers([]);
    };

    return (
        <TimerContext.Provider value={{
            timers,
            addTimer,
            removeTimer,
            activeTimerId,
            setActiveTimerId,
            pauseAllTimers,
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
