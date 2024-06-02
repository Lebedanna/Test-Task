import {Timer} from '../../context/TimerContext';

export interface TimerItemProps {
    timer: Timer;
    isEditMode: boolean;
    onDelete: () => void;
}