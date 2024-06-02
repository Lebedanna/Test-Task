import styles from './NavigationButton.module.css';
import {NavigationButtonProps} from "./NavigationButton.props.ts";
import cn from 'classnames';

function NavigationButton({children, className, appearance = 'edit', ...props}: NavigationButtonProps) {
    return (
        <button className={cn(styles['button-link'], className, {
            [styles['timers']]: appearance === 'timers',
            [styles['cancel']]: appearance === 'cancel',
            [styles['edit']]: appearance === 'edit'
        })} {...props}>
            {children}
        </button>
    )
}

export default NavigationButton