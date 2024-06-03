import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Main-page.module.css';
import TimerContext, {TimerContextType} from '../../context/TimerContext.tsx';
import TimerItem from '../../components/timer-item/TimerItem.tsx';
import NavigationButton from '../../components/navigation-button/NavigationButton.tsx';

const MainPage: React.FC = () => {
    const {
        timers,
        removeTimer,
        deleteAllTimers,
        pauseAllTimers,
        resetAllTimers,
        startAllTimers
    } = useContext<TimerContextType>(TimerContext);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDelete = (id: number) => {
        removeTimer(id);
    };


    return (
        <div className={styles['main-page']}>
            <div className={styles['page-header']}>
                <NavigationButton onClick={handleEditClick} className={styles['link-button']}>
                    {isEditMode ? 'Готово' : 'Править'}
                </NavigationButton>
                {isEditMode ? (
                    <button onClick={deleteAllTimers} className={styles['delete-all-button']}>Удалить все</button>
                ) : (
                    <>
                        <button onClick={startAllTimers} className={styles['start-all-button']}>Старт</button>
                        <button onClick={pauseAllTimers} className={styles['pause-all-button']}>Стоп</button>
                        <button onClick={resetAllTimers} className={styles['reset-all-button']}>Сброс</button>
                    </>
                )}
                <NavLink to={'/timers'}>
                    <button className={styles['add-button']}>+</button>
                </NavLink>
            </div>
            <h1>Таймеры</h1>
            <div className={styles['timers-list-container']}>
                <div className={styles['timers-list']}>
                    {timers.map((timer) => (
                        <TimerItem
                            key={timer.id}
                            timer={timer}
                            isEditMode={isEditMode}
                            onDelete={() => handleDelete(timer.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
