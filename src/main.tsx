import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./pages/main-page/Main-page.tsx";
import {TimerPage} from "./pages/timer-page/Timer-page.tsx";
import { TimerProvider } from './context/TimerContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '/timers',
        element: <TimerPage/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TimerProvider>
            {
                <RouterProvider router={router}/>
            }

        </TimerProvider>
    </React.StrictMode>,
)
