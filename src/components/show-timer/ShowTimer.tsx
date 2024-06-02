import React from 'react';
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {ShowTimerProps} from "./ShowTimer.props.ts";
import styles from './ShowTimer.module.css';
import OperationButton from "../operation-button/Operation-button.tsx";

const ShowTimer: React.FC<ShowTimerProps> = ({
                                                 minutes,
                                                 seconds,
                                                 isPaused,
                                                 handlePause,
                                                 handleReset,
                                                 handleResume,
                                                 totalSeconds
                                             }) => {
    const currentSeconds = minutes * 60 + seconds;
    const percentage = (currentSeconds / totalSeconds) * 100;
    return (

        <div className={styles['show-container']}>
            <div className={styles['timer-box']}>
                <div className={styles['progress-circle-container']}>
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={3}
                        styles={buildStyles({
                            pathColor: 'var(--green-color)',
                            trailColor: 'transparent',
                            strokeLinecap: 'butt',
                            rotation: 0.25
                        })}
                    />
                </div>
                <div className={styles['time-display']}>
                    <div className={styles['minutes']}>{minutes < 10 ? `0${minutes}` : minutes}</div>
                    <span className={styles['separator']}>:</span>
                    <div className={styles['seconds']}>{seconds < 10 ? `0${seconds}` : seconds}</div>
                </div>
            </div>

            <div className={styles['action-box']}>
                {!isPaused && (
                    <OperationButton
                        onClick={handlePause}
                        appearance='pause'
                        className='timer-button'>
                        Пауза
                    </OperationButton>
                )}
                {isPaused && (
                    <OperationButton
                        appearance='resume'
                        onClick={handleResume}
                        className='timer-button'>
                        Возобновить
                    </OperationButton>
                )}
                <OperationButton
                    className='timer-button'
                    onClick={handleReset}
                    appearance='cancel'>
                    Отмена
                </OperationButton>
            </div>
        </div>
    );
};

export default ShowTimer