import React, {useContext, useEffect, useState} from 'react';
import styles from './SetTimer.module.css';
import InputTimer from '../input-timer/InputTimer';
import ShowTimer from "../show-timer/ShowTimer.tsx";
import {SetTimerProps} from "./SetTimer.props";
import {NavLink} from "react-router-dom";
import NavigationButton from "../navigation-button/NavigationButton.tsx";
import TimerContext from "../../context/TimerContext.tsx";

const SetTimer: React.FC = () => {
    const [isStart, setIsStart] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [timerId] = useState<number>(Math.floor(Math.random() * 1000));
    const {addTimer} = useContext(TimerContext);

    const handleStart = ({minutes, seconds}: SetTimerProps) => {
        const totalMinutes = Number(minutes);
        const totalSeconds = totalMinutes * 60 + Number(seconds);
        setIsStart(true);
        setMinutes(totalMinutes);
        setSeconds(Number(seconds));
        setTotalMinutes(totalMinutes);
        setTotalSeconds(totalSeconds)

        addTimer({
            id: timerId,
            duration: totalMinutes * 60 + Number(seconds),
            originalDuration: totalMinutes * 60 + Number(seconds),
            isRunning: false
        });
    };

    const handleResume = () => {
        setIsPaused(false);
        runTimer();
    };

    const handlePause = () => {
        setIsPaused(true);
        if (intervalId) {
            clearInterval(intervalId);
        }
    };

    const handleReset = () => {
        setIsStart(false);
        resetTimer();
    };

    const resetTimer = () => {
        setMinutes(0);
        setSeconds(0);
        if (timerId) {
            clearInterval(timerId);
        }
    };

    const runTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        const tid = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else if (prevSeconds === 0 && minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    return 59;
                } else {
                    clearInterval(tid);
                    handleReset();
                    return 0;
                }
            });
        }, 1000);

        setIntervalId(tid);
    };

    useEffect(() => {
        if (isStart && !isPaused) {
            runTimer();
        }
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [isStart, isPaused, minutes, seconds]);

    return (
        <div className={styles["show-timer"]}>
            {!isStart && (
                <div>
                    <div className={styles['page-header']}>
                        <NavLink to={'/'}>
                            <NavigationButton className={styles['link-button']}
                                              appearance={'cancel'}>Отменить</NavigationButton>
                        </NavLink>
                        <h1>Таймер</h1>
                    </div>
                    <InputTimer handleStart={handleStart} addTimer={addTimer}/>
                </div>
            )}
            {isStart && (
                <div>
                    <div className={styles['page-header']}>
                        <NavLink to={'/'}>
                            <NavigationButton className={styles['link-button']}
                                              appearance={'timers'}>Таймеры</NavigationButton>
                        </NavLink>
                    </div>
                    <ShowTimer
                        minutes={minutes}
                        seconds={seconds}
                        isPaused={isPaused}
                        handlePause={handlePause}
                        handleReset={handleReset}
                        handleResume={handleResume}
                        totalMinutes={totalMinutes}
                        totalSeconds={totalSeconds}
                    />
                </div>
            )}
        </div>
    );
};

export default SetTimer;
