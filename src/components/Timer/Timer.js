import React, { useState,useEffect } from 'react';
import './Timer.scss';

const Timer = () => {
    const [inputMinutes,setinputMinutes] = useState('3');
    const [minutes,setMinutes] = useState('03');
    const [seconds,setSeconds] = useState('00');
    const [isActive,setIsActive] = useState(false);
    const [isRunning,setIsRunning] = useState(false);
    const [isPause,setIsPause] = useState(false);
    const [currentTimer,setcurrentTimer] = useState(null);

    useEffect(() => {
        let intervalId;
        if(isActive){
            let timer = currentTimer,minute,seconds;
            intervalId =  setInterval(() => {
                minute = Math.floor(timer % 3600 / 60);
                seconds = Math.floor(timer % 3600 % 60);
                minute = minute < 10 ? "0" + minute : minute;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                setMinutes(minute);
                setSeconds(seconds);
                if (--timer < 0) {
                    stopTimer();
                }
                setcurrentTimer(timer);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isActive]);

    
    function startTimer() {
        let duration = 60 * minutes;
        setcurrentTimer(duration);
        setIsActive(!isActive);
        setIsRunning(!isRunning);
    }

    function resumeTimer() {
        setIsActive(!isActive);
        setIsPause(!isPause)
    }

    function pauseTimer() {
        setIsActive(!isActive);
        setIsPause(!isPause);
    }
    
    function stopTimer() {
        setMinutes(`0${inputMinutes}`);
        inputMinutes < 10 ?  setMinutes(`0${inputMinutes}`) :  setMinutes(inputMinutes);
        setSeconds('00');
        setIsActive(false);
        setIsPause(false);
        setIsRunning(!isRunning);
        setcurrentTimer(null);
    }

    const handleMinuteChange = (e) =>{
        let minutes = e.target.value;
        const re = /^(?!0)[0-9]+$/;
        if (minutes === '' || re.test(minutes)) {
            console.log(minutes)
            setIsActive(false);
            setinputMinutes(minutes);
            minutes < 10 ? setMinutes(`0${minutes}`) : setMinutes(minutes);
            setSeconds('00');
            setcurrentTimer(null);
        }
       
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