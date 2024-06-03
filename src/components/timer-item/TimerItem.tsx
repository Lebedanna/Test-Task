import React, {useEffect, useContext} from 'react';
import styles from './TimerItem.module.css';
import { TimerItemProps } from './TimerItem.props.ts';
import TimerContext from "../../context/TimerContext.tsx";

const TimerItem: React.FC<TimerItemProps> = ({ timer, isEditMode, onDelete }) => {
    const {startTimer, stopTimer} = useContext(TimerContext);
    const isRunning = timer.isRunning;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                if (timer.elapsedTime < timer.duration) {
                    startTimer(timer.id);
                } else {
                    stopTimer(timer.id);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [startTimer, stopTimer, timer.duration, isRunning, timer.id]);

    const minutes = Math.floor((timer.duration - timer.elapsedTime) / 60);
    const seconds = (timer.duration - timer.elapsedTime) % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    return (
        <div className={styles['timer-item']}>
            {isEditMode && (
                <button className={styles['delete-btn']} onClick={onDelete}>
                    <img src='/delete.svg' alt='delete'/>
                </button>
            )}
            <div className={isEditMode ? styles['time-display-edit'] : styles['time-display']}>
                <div className={styles['time']}>
                    {formattedMinutes}:{formattedSeconds}
                </div>
                <div className={styles['text-time']}>
                    {Math.floor(timer.originalDuration / 60)} мин
                </div>
            </div>
            <div className={styles['icon']}>
                {isEditMode ? (
                    <button className={styles['navigate-btn']}>
                        <img src='/arrow.svg' alt='navigate'/>
                    </button>
                ) : (
                    isRunning ? (
                        <button onClick={() => stopTimer(timer.id)} className={styles['pause-btn']}>
                            <img src='/pause.svg' alt='stop'/>
                        </button>
                    ) : (
                        <button onClick={() => startTimer(timer.id)} className={styles['start-btn']}>
                            <img src='/start.svg' alt='start'/>
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default TimerItem;