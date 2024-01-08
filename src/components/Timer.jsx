import { useEffect } from "react"

export default function Timer({ time, dispatch }) {

    useEffect(function () {
        const timer = setInterval(() => {
            dispatch({ type: 'tick' })
        }, 1000)
        return () => clearInterval(timer)
    }, [dispatch])

    return (
        <div className="custom__timer">
            {formatTime(time)}
        </div>
    )
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return padTo2Digits(minutes) + ":" + padTo2Digits(remainingSeconds);
}





