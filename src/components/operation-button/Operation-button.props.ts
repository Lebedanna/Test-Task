import {ButtonHTMLAttributes, ReactNode} from "react";

export interface OperationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    appearance?: 'resume' | 'pause' | 'cancel'
}