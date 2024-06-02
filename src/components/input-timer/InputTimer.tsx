import React, {useContext, useState} from 'react';
import styles from './InputTimer.module.css';
import {InputTimerProps} from './InputTimer.props.ts'
import Picker from 'react-mobile-picker';
import TimerContext, {TimerContextType} from "../../context/TimerContext.tsx";

const InputTimer: React.FC<InputTimerProps> = ({ handleStart }) => {
    const [pickerValue, setPickerValue] = useState({
        minutes: '00',
        seconds: '00'
    });


    const { addTimer } = useContext(TimerContext);
    const handleStartClick = () => {
        if (pickerValue.minutes === '00' && pickerValue.seconds === '00') {
            return;
        }
        handleStart(pickerValue);
        const totalMinutes = Number(pickerValue.minutes);
        const totalSeconds = Number(pickerValue.seconds);
        addTimer({
            id: Math.floor(Math.random() * 1000),
            name: "Timer",
            duration: totalMinutes * 60 + totalSeconds,
            originalDuration: totalMinutes * 60 + totalSeconds,
            isRunning: false
        });
    };

    const defaultContextValues: TimerContextType = {
        timers: [],
        addTimer: () => {},
        removeTimer: () => {},
        pauseAllTimers: () => {},
        resetAllTimers: () => {},
        updateTimerRunningState: () => {},
        deleteAllTimers: () => {},
        activeTimerId: null,
        setActiveTimerId: () => {},
        resetElapsedTime: () => {},
    };

    return (
        <div className={styles['input-container']}>
            <div className={styles['input-wheel']}>
                <div className={styles['wheel-minutes']}>
                    <Picker
                        value={pickerValue}
                        onChange={setPickerValue}
                        wheelMode="normal">
                        <Picker.Column name="minutes">
                            {Array.from({length: 100}, (_, i) => (
                                <Picker.Item key={i} value={i.toString()}>
                                    {({selected}) => (
                                        <div className={selected ? styles.selectedItem : styles.nonSelectedItem}>
                                            {i.toString()}
                                        </div>
                                    )}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    </Picker>
                    <div>мин</div>
                </div>
                <div className={styles['wheel-seconds']}>
                    <Picker value={pickerValue}
                            onChange={setPickerValue}
                            wheelMode="normal">
                        <Picker.Column name="seconds">
                            {Array.from({length: 61}, (_, i) => (
                                <Picker.Item key={i} value={i.toString()}>
                                    {({selected}) => (
                                        <div className={selected ? styles.selectedItem : styles.nonSelectedItem}>
                                            {i.toString()}
                                        </div>
                                    )}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    </Picker>
                    <div>сек</div>
                </div>
            </div>
            <div className={styles['button-div']}>
                <TimerContext.Provider value={{ ...defaultContextValues, addTimer}}>
                    <button onClick={handleStartClick} className={styles['timer-button']}>
                        Старт
                    </button>
                </TimerContext.Provider>
            </div>
        </div>
    );
};

export default InputTimer;

