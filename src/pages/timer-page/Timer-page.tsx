import styles from './Timer-page.module.css'
import SetTimer from "../../components/set-timer/SetTimer.tsx";

export function TimerPage() {
    return (
        <div className={styles['timer-page']}>
            <SetTimer/>
        </div>
    )
}