import React, { useState,useEffect } from 'react';
import './Timer.scss';

const Timer = () => {
    const [inputMinutes,setinputMinutes] = useState('3');
    const [minutes,setMinutes] = useState('03');
    const [seconds,setSeconds] = useState('00');
    const [active,setActive] = useState(false);
    const [isRunning,setIsRunning] = useState(false);
    const [isPause,setIsPause] = useState(false);
    const [currentTimer,setcurrentTimer] = useState(null);

    useEffect(() => {
        let intervalId;
        if(active){
            let timer = currentTimer;
            let min,sec;
            intervalId =  setInterval(() => {
                min = Math.floor(timer % 3600 / 60);
                sec = Math.floor(timer % 3600 % 60);
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                setMinutes(min);
                setSeconds(sec);
                if (--timer < 0) {
                    stopTimer();
                }
                setcurrentTimer(timer);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [active]);

    
    function startTimer() {
        let duration = 60 * minutes;
        setcurrentTimer(duration);
        setActive(!active);
        setIsRunning(!isRunning);
    }

    function resumeTimer() {
        setActive(!active);
        setIsPause(!isPause)
    }

    function pauseTimer() {
        setActive(!active);
        setIsPause(!isPause);
    }
    
    function stopTimer() {
        setMinutes(`0${inputMinutes}`);
        setSeconds('00');
        setActive(false);
        setIsPause(false);
        setIsRunning(!isRunning);
        setcurrentTimer(null);
    }

    const handleMinuteChange = (e) =>{
        let minutes = e.target.value;
        setActive(false);
        setinputMinutes(minutes);
        setMinutes(`0${minutes}`);
        setSeconds('00');
        setcurrentTimer(null);
    }
   
    return (
        <div className='container'>
            <input 
            className={`minutes ${isRunning ? 'hide' : ''}`}
            type="text" 
            id="minutes"
            value={inputMinutes} 
            maxLength={2} 
            placeholder="Enter minutes here..."
            onChange={handleMinuteChange}/>
            <div className="timer">
                <div className="runtimer">
                    <span className="minutes">{minutes}</span>
                    <span>:</span>
                    <span className="seconds">{seconds}</span>
                </div>
                <div className="button-actions">
                    {!isRunning 
                        ? 
                        <button className='start' onClick={() => startTimer()}>Start</button>
                        :
                        <>
                            {isPause ? 
                                <button className='resume' onClick={() => resumeTimer()}>Resume</button> 
                                : 
                                <button className='pause' onClick={() => pauseTimer()}>Pause</button>
                            }
                            <button className='reset' onClick={() => stopTimer()}>Reset</button>
                        </>
                    }
                </div>
            </div>
        </div>
        
    );
};

export default Timer;