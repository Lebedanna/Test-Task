import {ButtonHTMLAttributes, ReactNode} from "react";

export interface NavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    appearance?: 'cancel' | 'timers' | 'edit'
}