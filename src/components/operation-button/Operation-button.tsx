import styles from './Operation-button.module.css';
import {OperationButtonProps} from "./Operation-button.props.ts";
import cn from 'classnames';

function OperationButton({children, className, appearance = 'pause', ...props}: OperationButtonProps) {
    return (
        <button className={cn(styles['operation-button'], className, {
            [styles['resume']]: appearance === 'resume',
            [styles['pause']]: appearance === 'pause',
            [styles['cancel']]: appearance === 'cancel'
        })} {...props}>
            {children}
        </button>
    )
}

export default OperationButton